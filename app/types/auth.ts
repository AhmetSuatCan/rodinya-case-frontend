// Authentication Request Types
export interface RegisterRequest {
  name: string;
  email: string;
  password: string; // minimum 6 characters
}

export interface LoginRequest {
  email: string;
  password: string;
}

// User object (returned in responses)
export interface User {
  _id: string;
  name: string;
  email: string;
  isVIP: boolean;
  createdAt: string;
  updatedAt: string;
}

// Authentication Response Types
export interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
  isVIP: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  message: string;
}

export interface ProfileResponse {
  message: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// API Response wrapper type for better error handling
export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: ErrorResponse;
};
