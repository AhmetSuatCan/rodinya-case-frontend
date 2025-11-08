'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/productService';
import { Product, ProductsResponse, ErrorResponse } from '../types/products';

/**
 * Hook for fetching all products with stock
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ProductService.getProductsWithStock();
      setProducts(data);
    } catch (err) {
      setError(err as ErrorResponse);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

/**
 * Hook for fetching a specific product with stock
 */
export function useProduct(productId: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetchProduct = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ProductService.getProductWithStock(id);
      setProduct(data);
    } catch (err) {
      setError(err as ErrorResponse);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    } else {
      setProduct(null);
      setError(null);
    }
  }, [productId, fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: productId ? () => fetchProduct(productId) : undefined,
  };
}

/**
 * Hook for filtering products by various criteria
 */
export function useProductFilter(products: Product[]) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    let filtered = [...products];

    // Filter by search term (name or description)
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by price range
    if (minPrice !== null) {
      filtered = filtered.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= maxPrice);
    }

    // Filter by stock availability
    if (inStockOnly) {
      filtered = filtered.filter(product => product.availableStock > 0);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, minPrice, maxPrice, inStockOnly]);

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    inStockOnly,
    setInStockOnly,
    clearFilters: () => {
      setSearchTerm('');
      setMinPrice(null);
      setMaxPrice(null);
      setInStockOnly(false);
    },
  };
}
