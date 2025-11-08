"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useLoginForm } from "../../hooks/useAuth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, isLoading, error, clearError } = useLoginForm();
  
  const { register, formState: { errors }, watch } = form;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Sign in to your Rodinya account
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.email 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-slate-300 dark:border-slate-600'
              }`}
              placeholder="Enter your email"
              onClick={clearError}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`block w-full pl-10 pr-12 py-3 border rounded-xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.password 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-slate-300 dark:border-slate-600'
              }`}
              placeholder="Enter your password"
              onClick={clearError}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-8 mb-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300 dark:border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
              Don't have an account?
            </span>
          </div>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <Link
          href="/register"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Create a new account
        </Link>
      </div>
    </div>
  );
}