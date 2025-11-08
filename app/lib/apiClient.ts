import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ErrorResponse } from '../types/auth';

/**
 * Base API URL for the backend service
 */
const API_BASE_URL = 'https://api.rodinya-case.ahmetsuatcan.com';

/**
 * Axios instance configured for authentication API calls
 * Includes proper cookie handling and error response formatting
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // Essential for HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor for debugging and logging
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Token refresh state management
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

/**
 * Process the queue of requests that were waiting for token refresh
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

/**
 * Response interceptor with automatic token refresh capability
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 errors with automatic token refresh
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip token refresh for auth endpoints to avoid infinite loops
      // Exception: /auth/profile is allowed to trigger token refresh
      const isAuthEndpoint = originalRequest.url?.includes('/auth/');
      const isProfileEndpoint = originalRequest.url?.includes('/auth/profile');
      
      if (isAuthEndpoint && !isProfileEndpoint) {
        return Promise.reject(error.response.data || {
          statusCode: 401,
          message: 'Authentication failed',
          error: 'Unauthorized',
        });
      }

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          // Retry the original request after token refresh
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint directly to avoid circular dependency
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        processQueue(null, 'success');
        isRefreshing = false;
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // If refresh fails, redirect to login or handle as needed
        if (typeof window !== 'undefined') {
          // Optional: You can dispatch a custom event or call a logout function
          window.dispatchEvent(new CustomEvent('auth:logout', { 
            detail: { reason: 'token_refresh_failed' } 
          }));
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other HTTP errors
    if (error.response) {
      // Server responded with error status
      const errorData: ErrorResponse = error.response.data || {
        statusCode: error.response.status,
        message: error.message || 'An error occurred',
        error: error.response.statusText || 'Unknown Error',
      };
      
      return Promise.reject(errorData);
    } else if (error.request) {
      // Network error
      const networkError: ErrorResponse = {
        statusCode: 0,
        message: 'Network error - please check your connection and ensure the API server is running',
        error: 'Network Error',
      };
      return Promise.reject(networkError);
    } else {
      // Something else happened
      const unknownError: ErrorResponse = {
        statusCode: 500,
        message: error.message || 'An unexpected error occurred',
        error: 'Unknown Error',
      };
      return Promise.reject(unknownError);
    }
  }
);
