import { apiClient } from '../lib/apiClient';
import { 
  Order, 
  CreateOrderRequest, 
  CreateOrderResponse, 
  OrdersResponse 
} from '../types/orders';

/**
 * Order Service
 * Handles all order-related API calls based on the backend API documentation
 * Note: All order endpoints require authentication (JWT tokens in cookies)
 */
export class OrderService {
  /**
   * Create a new order
   * Endpoint: POST /orders
   * Authentication: Required (JWT token in cookies)
   * 
   * @param orderData - Order creation data including stockId, quantity, and priceAtPurchase
   */
  static async createOrder(orderData: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
      const response = await apiClient.post<CreateOrderResponse>('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all orders for the authenticated user
   * Endpoint: GET /orders
   * Authentication: Required (JWT token in cookies)
   * Returns orders sorted by creation date (most recent first)
   */
  static async getUserOrders(): Promise<OrdersResponse> {
    try {
      const response = await apiClient.get<OrdersResponse>('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Helper method to get orders by status
   * @param status - Filter orders by specific status
   */
  static async getOrdersByStatus(status: Order['status']): Promise<Order[]> {
    try {
      const orders = await this.getUserOrders();
      return orders.filter(order => order.status === status);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Helper method to get pending orders
   */
  static async getPendingOrders(): Promise<Order[]> {
    return this.getOrdersByStatus('PENDING');
  }

  /**
   * Helper method to get confirmed orders
   */
  static async getConfirmedOrders(): Promise<Order[]> {
    return this.getOrdersByStatus('CONFIRMED');
  }

  /**
   * Helper method to get failed orders
   */
  static async getFailedOrders(): Promise<Order[]> {
    return this.getOrdersByStatus('FAILED');
  }
}

// Export default instance for convenience
export default OrderService;
