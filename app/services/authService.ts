import { apiClient } from '../lib/apiClient';
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  MessageResponse,
  ErrorResponse,
} from '../types/auth';

/**
 * Authentication Service Class
 * Handles all authentication-related API operations including:
 * - User registration
 * - User login/logout
 * - Token refresh
 * - Profile management
 * 
 * Uses HTTP-only cookies for secure token storage managed by the backend.
 */
class AuthService {
  private readonly AUTH_BASE_PATH = '/auth';

  /**
   * Register a new user account
   * @param data - Registration data including name, email, and password
   * @returns Promise<RegisterResponse> - User registration details
   * @throws ErrorResponse - On validation errors (400) or user exists (409)
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(
        `${this.AUTH_BASE_PATH}/register`,
        data
      );
      return response.data;
    } catch (error) {
      throw error as ErrorResponse;
    }
  }

  /**
   * Authenticate user and establish session
   * @param data - Login credentials (email and password)
   * @returns Promise<LoginResponse> - User data and success message
   * @throws ErrorResponse - On invalid credentials (401) or validation errors (400)
   * 
   * Side effects:
   * - Sets HTTP-only cookies (access_token, refresh_token)
   * - Access token expires in 15 minutes
   * - Refresh token expires in 7 days
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        `${this.AUTH_BASE_PATH}/login`,
        data
      );
      return response.data;
    } catch (error) {
      throw error as ErrorResponse;
    }
  }

  /**
   * Logout user and clear authentication session
   * @returns Promise<MessageResponse> - Logout confirmation message
   * @throws ErrorResponse - On server errors (500)
   * 
   * Side effects:
   * - Clears all authentication cookies
   * - Invalidates current session
   */
  async logout(): Promise<MessageResponse> {
    try {
      const response = await apiClient.post<MessageResponse>(
        `${this.AUTH_BASE_PATH}/logout`
      );
      return response.data;
    } catch (error) {
      throw error as ErrorResponse;
    }
  }

  /**
   * Refresh access token using refresh token
   * @returns Promise<MessageResponse> - Refresh confirmation message
   * @throws ErrorResponse - On invalid/expired refresh token (401)
   * 
   * Side effects:
   * - Updates HTTP-only cookies with new access token
   * - Automatically uses refresh_token from existing cookies
   * - New access token expires in 15 minutes
   */
  async refreshToken(): Promise<MessageResponse> {
    try {
      const response = await apiClient.post<MessageResponse>(
        `${this.AUTH_BASE_PATH}/refresh`
      );
      return response.data;
    } catch (error) {
      throw error as ErrorResponse;
    }
  }

  /**
   * Get current user profile information
   * @returns Promise<ProfileResponse> - User profile data
   * @throws ErrorResponse - On unauthorized access (401) or server errors (500)
   * 
   * Requirements:
   * - Valid access_token cookie must be present
   * - User must be authenticated
   */
  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await apiClient.get<ProfileResponse>(
        `${this.AUTH_BASE_PATH}/profile`
      );
      return response.data;
    } catch (error) {
      throw error as ErrorResponse;
    }
  }

  /**
   * Check if user is currently authenticated
   * @returns Promise<boolean> - Authentication status
   * 
   * This method attempts to fetch the user profile to determine
   * if the user has a valid session. Returns false if profile
   * fetch fails (indicating no valid authentication).
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      await this.getProfile();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Attempt to refresh token and retry authentication
   * @returns Promise<boolean> - Success status of refresh attempt
   * 
   * Utility method for handling expired access tokens.
   * Attempts to refresh the token and returns success status.
   */
  async attemptTokenRefresh(): Promise<boolean> {
    try {
      await this.refreshToken();
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
