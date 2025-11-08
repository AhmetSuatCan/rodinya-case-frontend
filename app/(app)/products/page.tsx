'use client';

import { useProducts, useProductFilter } from '../../hooks/useProduct';
import { useCreateOrder } from '../../hooks/useOrder';
import { Search, Filter, RefreshCw, ShoppingCart, Package, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

export default function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();
  const { createOrder, loading: orderLoading, success, error: orderError } = useCreateOrder();
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    inStockOnly,
    setInStockOnly,
    clearFilters,
  } = useProductFilter(products);

  const handleCreateOrder = async (stockId: string, price: number) => {
    const orderData = {
      stockId,
      quantity: 1,
      priceAtPurchase: price,
    };
    
    const result = await createOrder(orderData);
    if (result) {
      // Optionally refetch products to update stock
      refetch();
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-8">
            <div className="flex items-center justify-center space-x-3">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-lg text-slate-600 dark:text-slate-300">Loading products...</span>
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

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
            </div>
            
            <label className="flex items-center space-x-3 px-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">In Stock Only</span>
            </label>
            
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
            >
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>

        {/* Order Status */}
        {orderLoading && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-blue-700 dark:text-blue-300 font-medium">Creating order...</span>
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 dark:text-green-300 font-medium">Order created successfully!</span>
            </div>
          </div>
        )}
        
        {orderError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-700 dark:text-red-300 font-medium">Order error: {orderError.message}</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.productId} className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Product Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  product.availableStock > 0 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {product.availableStock > 0 ? `${product.availableStock} in stock` : 'Out of stock'}
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-6">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {product.price}
                </span>
              </div>

              {/* Order Button */}
              <button
                onClick={() => handleCreateOrder(product.stockId, product.price)}
                disabled={product.availableStock === 0 || orderLoading}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  product.availableStock === 0 || orderLoading
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  {product.availableStock === 0 ? 'Out of Stock' : 'Order Now'}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              No products match your current search criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}