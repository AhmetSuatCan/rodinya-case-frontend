/**
 * Product type definitions based on the backend API responses
 */

export interface Product {
  productId: string;
  stockId: string;
  name: string;
  price: number;
  description?: string;
  images?: string[];
  availableStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse extends Array<Product> {}

export interface ProductResponse extends Product {}

/**
 * Error response structure from the API
 */
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
