import { useAuthStore } from "../stores/authStore";

const BASE_URL = "http://localhost:3001";

interface FetchOptions extends Omit<RequestInit, "body"> {
  data?: unknown;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { accessToken, refreshAccessToken, logout } = useAuthStore.getState();

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  if (options.data !== undefined) {
    config.body = JSON.stringify(options.data);
  }

  let response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    // Attempt silent refresh
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      const newAccessToken = useAuthStore.getState().accessToken;
      if (newAccessToken) {
        headers.set("Authorization", `Bearer ${newAccessToken}`);
      }
      // Retry request
      response = await fetch(`${BASE_URL}${endpoint}`, { ...config, headers });
    } else {
      throw new Error("Unauthorized");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, options?: FetchOptions) => apiFetch<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, data?: unknown, options?: FetchOptions) => apiFetch<T>(endpoint, { ...options, method: "POST", data }),
  put: <T>(endpoint: string, data?: unknown, options?: FetchOptions) => apiFetch<T>(endpoint, { ...options, method: "PUT", data }),
  patch: <T>(endpoint: string, data?: unknown, options?: FetchOptions) => apiFetch<T>(endpoint, { ...options, method: "PATCH", data }),
  delete: <T>(endpoint: string, options?: FetchOptions) => apiFetch<T>(endpoint, { ...options, method: "DELETE" }),
  del: <T>(endpoint: string, options?: FetchOptions) => apiFetch<T>(endpoint, { ...options, method: "DELETE" }),
};
