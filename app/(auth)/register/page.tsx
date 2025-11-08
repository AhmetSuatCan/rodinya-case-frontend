"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { useRegisterForm } from "../../hooks/useAuth";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { form, onSubmit, isLoading, error, clearError } = useRegisterForm();
  
  const { register, formState: { errors }, watch } = form;
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");
  
  const passwordsMatch = watchPassword && watchConfirmPassword && watchPassword === watchConfirmPassword;
  const isPasswordValid = watchPassword && watchPassword.length >= 6;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Create Account
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Join Rodinya and start ordering smarter
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
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.firstName 
                    ? 'border-red-300 dark:border-red-600' 
                    : 'border-slate-300 dark:border-slate-600'
                }`}
                placeholder="John"
                onClick={clearError}
              />
            </div>
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              className={`block w-full px-3 py-3 border rounded-xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.lastName 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-slate-300 dark:border-slate-600'
              }`}
              placeholder="Doe"
              onClick={clearError}
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
            )}
          </div>
        </div>

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
              placeholder="john@example.com"
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
              placeholder="Create a strong password"
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
          {watchPassword && !errors.password && (
            <div className="mt-2 flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isPasswordValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${isPasswordValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isPasswordValid ? 'Strong password' : 'Password must be at least 6 characters'}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`block w-full pl-10 pr-12 py-3 border rounded-xl bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.confirmPassword 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-slate-300 dark:border-slate-600'
              }`}
              placeholder="Confirm your password"
              onClick={clearError}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
          )}
          {watchConfirmPassword && !errors.confirmPassword && (
            <div className="mt-2 flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${passwordsMatch ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${passwordsMatch ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </span>
            </div>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-3">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              type="checkbox"
              {...register("agreeToTerms")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
          </div>
          <div className="text-sm">
            <label htmlFor="agreeToTerms" className="text-slate-700 dark:text-slate-300">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.agreeToTerms.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
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
              Already have an account?
            </span>
          </div>
        </div>
      </div>

      {/* Sign In Link */}
      <div className="text-center">
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Sign in to your account
        </Link>
      </div>
    </div>
  );
}   