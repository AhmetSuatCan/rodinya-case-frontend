'use client';

import { useOrders, useOrderStats } from '../../../hooks/useOrder';
import { 
  RefreshCw, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Crown, 
  DollarSign, 
  Calendar,
  Hash,
  AlertCircle,
  TrendingUp,
  ShoppingBag
} from 'lucide-react';

export default function MyOrdersPage() {
  const { orders, loading, error, refetch } = useOrders();
  const { stats, loading: statsLoading } = useOrderStats();

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-8">
            <div className="flex items-center justify-center space-x-3">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-lg text-slate-600 dark:text-slate-300">Loading orders...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-8">
            <div className="flex items-center space-x-3 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <span className="text-lg">Error: {error.message}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'CONFIRMED':
        return 'text-green-700 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'FAILED':
        return 'text-red-700 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-slate-700 bg-slate-100 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4" />;
      case 'CONFIRMED':
        return <CheckCircle className="h-4 w-4" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My Orders
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Track and manage all your orders in one place
          </p>
          <button
            onClick={refetch}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Refresh Orders</span>
          </button>
        </div>

        {/* Order Statistics */}
        {!statsLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Orders</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Confirmed</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.confirmed}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Value</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${stats.totalValue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Start shopping to see your orders here!
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6 hover:shadow-xl transition-all duration-300">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                  <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {order.productName}
                      </h3>
                      {order.productDescription && (
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {order.productDescription}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {order.isVipOrder && (
                      <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-xs font-medium">
                        <Crown className="h-3 w-3" />
                        <span>VIP</span>
                      </div>
                    )}
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Hash className="h-4 w-4 text-slate-500" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Quantity</p>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{order.quantity}</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Price</p>
                    </div>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">${order.priceAtPurchase}</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-slate-500" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total</p>
                    </div>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      ${(order.priceAtPurchase * order.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Order Date</p>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Failure Reason */}
                {order.status === 'FAILED' && order.failureReason && (
                  <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">
                        <strong>Failure Reason:</strong> {order.failureReason}
                      </p>
                    </div>
                  </div>
                )}

                {/* Order Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Order ID: {order._id}</span>
                    <span>Last Updated: {new Date(order.updatedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
