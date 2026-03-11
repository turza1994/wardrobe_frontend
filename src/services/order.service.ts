import { apiClient } from './apiClient';
import { API } from '@/constants/api';
import type { Order, CheckoutPayload, OrderStatus } from '@/types/order';

export const orderService = {
  /**
   * Get all orders (admin)
   */
  getOrders: (): Promise<Order[]> =>
    apiClient.get<Order[]>(API.ORDERS.LIST),

  /**
   * Get orders for a specific user
   */
  getMyOrders: (userId: string): Promise<Order[]> =>
    apiClient.get<Order[]>(API.ORDERS.MY_ORDERS(userId)),

  /**
   * Get a single order by ID
   */
  getOrderById: (id: string): Promise<Order> =>
    apiClient.get<Order>(API.ORDERS.BY_ID(id)),

  /**
   * Create a new order (checkout)
   */
  createOrder: (userId: string, payload: CheckoutPayload): Promise<Order> =>
    apiClient.post<Order>(API.ORDERS.CREATE, {
      ...payload,
      userId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      total: 0, // calculated server-side in real app
    }),

  /**
   * Update order status (vendor/admin)
   */
  updateOrderStatus: (id: string, status: OrderStatus): Promise<Order> =>
    apiClient.patch<Order>(API.ORDERS.UPDATE(id), { status, updatedAt: new Date().toISOString() }),
};
