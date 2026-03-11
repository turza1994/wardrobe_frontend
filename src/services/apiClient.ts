'use client';

import { useAuthStore, getRefreshToken } from '@/stores/authStore';
import { API } from '@/constants/api';
import { ROUTES } from '@/constants/routes';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

class ApiClientError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function performTokenRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(API.AUTH.REFRESH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;

    const data: RefreshResponse = await res.json();
    const { setTokens } = useAuthStore.getState();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { skipAuth = false, ...fetchOptions } = options;

  const buildHeaders = (token?: string | null): HeadersInit => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    };
    if (!skipAuth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  const { accessToken } = useAuthStore.getState();

  let response = await fetch(url, {
    ...fetchOptions,
    headers: buildHeaders(accessToken),
  });

  // Silent refresh on 401
  if (response.status === 401 && !skipAuth) {
    if (isRefreshing) {
      // Wait for the in-flight refresh
      const newToken = await new Promise<string>((resolve) => {
        subscribeTokenRefresh(resolve);
      });
      response = await fetch(url, {
        ...fetchOptions,
        headers: buildHeaders(newToken),
      });
    } else {
      isRefreshing = true;

      const newToken = await performTokenRefresh();
      isRefreshing = false;

      if (newToken) {
        onRefreshed(newToken);
        response = await fetch(url, {
          ...fetchOptions,
          headers: buildHeaders(newToken),
        });
      } else {
        // Refresh failed — clear auth and redirect
        const { clearAuth } = useAuthStore.getState();
        clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = ROUTES.AUTH.LOGIN;
        }
        throw new ApiClientError(401, 'Session expired. Please login again.');
      }
    }
  }

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }
    const message =
      typeof errorData === 'object' &&
      errorData !== null &&
      'message' in errorData &&
      typeof (errorData as Record<string, unknown>).message === 'string'
        ? (errorData as Record<string, string>).message
        : `HTTP Error ${response.status}`;
    throw new ApiClientError(response.status, message, errorData);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json() as Promise<T>;
}

// Typed HTTP method helpers
export const apiClient = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'DELETE' }),
};

export { ApiClientError };
