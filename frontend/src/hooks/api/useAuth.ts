import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../api/auth.api';
import { useAuthStore } from '../../store/auth.store';
import type {
  SignupDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '../../api/types';
import { getErrorMessage } from '../../services/error.service';

/**
 * React Query hooks for authentication
 */

/**
 * Get current authenticated user
 */
export function useCurrentUser() {
  const { setUser, clearAuth } = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'current-user'],
    queryFn: async () => {
      try {
        const user = await authApi.getCurrentUser();
        setUser(user);
        return user;
      } catch (error) {
        clearAuth();
        throw error;
      }
    },
    enabled: !!localStorage.getItem('accessToken'),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Signup mutation
 */
export function useSignup() {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: SignupDto) => authApi.signup(data),
    onSuccess: (response) => {
      setAuth(response.user, response.tokens);
      queryClient.setQueryData(['auth', 'current-user'], response.user);
    },
    onError: (error) => {
      throw new Error(getErrorMessage(error));
    },
  });
}

/**
 * Login mutation
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (response) => {
      setAuth(response.user, response.tokens);
      queryClient.setQueryData(['auth', 'current-user'], response.user);
    },
    onError: (error) => {
      throw new Error(getErrorMessage(error));
    },
  });
}

/**
 * Forgot password mutation
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordDto) => authApi.forgotPassword(data),
    onError: (error) => {
      throw new Error(getErrorMessage(error));
    },
  });
}

/**
 * Reset password mutation
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordDto) => authApi.resetPassword(data),
    onError: (error) => {
      throw new Error(getErrorMessage(error));
    },
  });
}

/**
 * Logout hook - clears auth state and invalidates queries
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();

  return () => {
    clearAuth();

    queryClient.clear();
		
    queryClient.removeQueries({ queryKey: ['auth'] });
    queryClient.removeQueries({ queryKey: ['bookmarks'] });
  };
}
