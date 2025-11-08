import { apiClient } from '../lib/apiClient';
import { Product, ProductsResponse, ProductResponse } from '../types/products';

/**
 * Product Service
 * Handles all product-related API calls based on the backend API documentation
 */
export class ProductService {
  /**
   * Get all products with stock information
   * Endpoint: GET /stock/products-with-stock
   * Authentication: Not required
   */
  static async getProductsWithStock(): Promise<ProductsResponse> {
    try {
      const response = await apiClient.get<ProductsResponse>('/stock/products-with-stock');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get specific product with stock information
   * Endpoint: GET /stock/products-with-stock/:productId
   * Authentication: Not required
   * 
   * @param productId - MongoDB ObjectId of the product
   */
  static async getProductWithStock(productId: string): Promise<ProductResponse> {
    try {
      const response = await apiClient.get<ProductResponse>(`/stock/products-with-stock/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Export default instance for convenience
export default ProductService;
