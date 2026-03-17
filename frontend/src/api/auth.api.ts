import client from './client';
import { API_ENDPOINTS } from './endpoints';
import type {
  SignupDto,
  LoginDto,
  LoggedInUserDto,
  UserDataDto,
} from './types';

export interface GoogleAuthDto {
  code: string;
}

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
   * Sign in with Google
   */
  googleAuth: async (data: GoogleAuthDto): Promise<LoggedInUserDto> => {
    const response = await client.post<LoggedInUserDto>(
      API_ENDPOINTS.AUTH.GOOGLE,
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
