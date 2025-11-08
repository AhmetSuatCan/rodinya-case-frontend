'use client';

import { useState, useEffect, useCallback } from 'react';
import { OrderService } from '../services/orderService';
import { 
  Order, 
  CreateOrderRequest, 
  OrdersResponse, 
  OrderStatus,
  ErrorResponse 
} from '../types/orders';

/**
 * Hook for managing user orders
 */
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await OrderService.getUserOrders();
      setOrders(data);
    } catch (err) {
      setError(err as ErrorResponse);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
  };
}

/**
 * Hook for creating orders
 */
export function useCreateOrder() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createOrder = useCallback(async (orderData: CreateOrderRequest): Promise<Order | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const newOrder = await OrderService.createOrder(orderData);
      setSuccess(true);
      return newOrder;
    } catch (err) {
      setError(err as ErrorResponse);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return {
    createOrder,
    loading,
    error,
    success,
    resetState,
  };
}

/**
 * Hook for filtering orders by status
 */
export function useOrdersByStatus(status?: OrderStatus) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetchOrdersByStatus = useCallback(async (orderStatus?: OrderStatus) => {
    setLoading(true);
    setError(null);
    
    try {
      let data: Order[];
      
      if (!orderStatus) {
        data = await OrderService.getUserOrders();
      } else {
        data = await OrderService.getOrdersByStatus(orderStatus);
      }
      
      setOrders(data);
    } catch (err) {
      setError(err as ErrorResponse);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrdersByStatus(status);
  }, [status, fetchOrdersByStatus]);

  return {
    orders,
    loading,
    error,
    refetch: () => fetchOrdersByStatus(status),
  };
}

/**
 * Hook for pending orders
 */
export function usePendingOrders() {
  return useOrdersByStatus('PENDING');
}

/**
 * Hook for confirmed orders
 */
export function useConfirmedOrders() {
  return useOrdersByStatus('CONFIRMED');
}

/**
 * Hook for failed orders
 */
export function useFailedOrders() {
  return useOrdersByStatus('FAILED');
}

/**
 * Hook for order statistics
 */
export function useOrderStats() {
  const { orders, loading, error } = useOrders();
  
  const stats = {
    total: orders.length,
    pending: orders.filter(order => order.status === 'PENDING').length,
    confirmed: orders.filter(order => order.status === 'CONFIRMED').length,
    failed: orders.filter(order => order.status === 'FAILED').length,
    vipOrders: orders.filter(order => order.isVipOrder).length,
    totalValue: orders
      .filter(order => order.status === 'CONFIRMED')
      .reduce((sum, order) => sum + (order.priceAtPurchase * order.quantity), 0),
  };

  return {
    stats,
    loading,
    error,
  };
}
