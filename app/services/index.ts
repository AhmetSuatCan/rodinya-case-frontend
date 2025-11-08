/**
 * Services Index
 * Central export point for all API services
 */

export { ProductService } from './productService';
export { OrderService } from './orderService';

// Re-export types for convenience
export type { Product, ProductsResponse, ProductResponse } from '../types/products';
export type { 
  Order, 
  OrderStatus, 
  CreateOrderRequest, 
  CreateOrderResponse, 
  OrdersResponse 
} from '../types/orders';