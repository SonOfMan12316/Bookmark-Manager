import client from './client';
import { API_ENDPOINTS } from './endpoints';
import type {
  SignupDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  LoggedInUserDto,
  UserDataDto,
  APIResponseDto,
} from './types';

/**
 * Auth API functions
 */
export const authApi = {
  /**
   * Register a new user
   */
  signup: async (data: SignupDto): Promise<LoggedInUserDto> => {
    const response = await client.post<LoggedInUserDto>(
      API_ENDPOINTS.AUTH.SIGNUP,
      data
    );
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginDto): Promise<LoggedInUserDto> => {
    const response = await client.post<LoggedInUserDto>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },

  /**
   * Request password reset
   */
  forgotPassword: async (data: ForgotPasswordDto): Promise<APIResponseDto> => {
    const response = await client.post<APIResponseDto>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );
    return response.data;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordDto): Promise<APIResponseDto> => {
    const response = await client.post<APIResponseDto>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
    return response.data;
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<UserDataDto> => {
    const response = await client.get<UserDataDto>(
      API_ENDPOINTS.AUTH.CURRENT_USER
    );
    return response.data;
  },
};
