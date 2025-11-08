'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ShoppingBag, User, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();

  const isActive = (path: string) => {
    // Exact match for home page
    if (path === '/') {
      return pathname === '/';
    }
    // For other paths, check if current path starts with the nav path
    return pathname === path || pathname.startsWith(path + '/');
  };

  // Base navigation items available to all users
  const baseNavItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  // Authenticated user navigation items
  const authenticatedNavItems = [
    ...baseNavItems,
    { href: '/profile', label: 'Profile' },
  ];

  // Get navigation items based on authentication status
  const navItems = isAuthenticated ? authenticatedNavItems : baseNavItems;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 dark:bg-slate-900/80 dark:border-slate-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rodinya Ordering
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Authentication Buttons */}
            {!isLoading && !isAuthenticated && (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Authentication Buttons */}
              {!isLoading && !isAuthenticated && (
                <div className="pt-4 space-y-2 border-t border-slate-200/50 dark:border-slate-700/50">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg transition-all duration-200"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
