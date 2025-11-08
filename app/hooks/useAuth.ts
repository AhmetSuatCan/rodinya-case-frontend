"use client";

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../services/authService';
import { User, LoginRequest, RegisterRequest, ErrorResponse } from '../types/auth';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const checkAuthStatus = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const isAuth = await authService.isAuthenticated();
      
      if (isAuth) {
        const profileResponse = await authService.getProfile();
        setAuthState({
          user: profileResponse.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null, // Don't show error for initial auth check
      });
    }
  }, []);

  // Initialize authentication state
  useEffect(() => {
    checkAuthStatus();
    
    // Listen for automatic logout events from the API interceptor
    const handleAutoLogout = (event: CustomEvent) => {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Your session has expired. Please log in again.',
      });
    };

    window.addEventListener('auth:logout', handleAutoLogout as EventListener);
    
    return () => {
      window.removeEventListener('auth:logout', handleAutoLogout as EventListener);
    };
  }, [checkAuthStatus]);

  const login = useCallback(async (data: LoginFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const loginData: LoginRequest = {
        email: data.email,
        password: data.password,
      };

      const response = await authService.login(loginData);
      
      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.message || 'Login failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const register = useCallback(async (data: RegisterFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const registerData: RegisterRequest = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      };

      const response = await authService.register(registerData);
      
      // After successful registration, log the user in
      const loginResult = await login({ email: data.email, password: data.password });
      
      if (loginResult.success) {
        return { success: true };
      } else {
        // Registration succeeded but login failed - still a success, but user needs to login manually
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: true };
      }
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.message || 'Registration failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, [login]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      await authService.logout();
    } catch (error) {
      // Even if logout API fails, clear local state
    } finally {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // State
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    
    // Actions
    login,
    register,
    logout,
    clearError,
    checkAuthStatus,
  };
};

// Hook for login form with validation
export const useLoginForm = () => {
  const { login, isLoading, error, clearError } = useAuth();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    const result = await login(data);
    if (result.success) {
      // Handle successful login (e.g., redirect)
      window.location.href = '/products';
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    error,
    clearError,
  };
};

// Hook for register form with validation
export const useRegisterForm = () => {
  const { register, isLoading, error, clearError } = useAuth();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    clearError();
    const result = await register(data);
    if (result.success) {
      // Handle successful registration (e.g., redirect)
      window.location.href = '/products';
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    error,
    clearError,
  };
};