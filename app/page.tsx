import Link from "next/link";
import { ArrowRight, ShoppingBag, Clock, Shield, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8">
              Order Smarter,
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Live Better
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of online ordering with Rodinya. Fast, secure, and intuitive - 
              your favorite products delivered with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Ordering Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="text-slate-600 dark:text-slate-300 px-8 py-4 rounded-full text-lg font-semibold border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Rodinya?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We've built the most intuitive ordering platform with features that matter to you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Order in seconds with our streamlined checkout process. No unnecessary steps, just pure efficiency.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Secure & Safe</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Your data and payments are protected with enterprise-grade security. Shop with complete confidence.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Premium Quality</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Curated products from trusted vendors. Every item meets our high standards for quality and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Shopping Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who've made the switch to smarter ordering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 transition-colors shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
