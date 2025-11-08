/**
 * Order type definitions based on the backend API responses
 */

export type OrderStatus = "PENDING" | "CONFIRMED" | "FAILED";

export interface Order {
  _id: string;
  userId: string;
  productName: string;
  productDescription: string;
  availableStock: number;
  quantity: number;
  priceAtPurchase: number;
  status: OrderStatus;
  isVipOrder: boolean;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  stockId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface CreateOrderResponse extends Order {}

export interface OrdersResponse extends Array<Order> {}

/**
 * Error response structure from the API
 */
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
