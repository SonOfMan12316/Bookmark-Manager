import { create } from 'zustand';
import type { UserDataDto, TokenDto } from '../api/types';

interface AuthState {
  user: UserDataDto | null;
  tokens: TokenDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: UserDataDto | null) => void;
  setTokens: (tokens: TokenDto | null) => void;
  setAuth: (user: UserDataDto, tokens: TokenDto) => void;
  clearAuth: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  // State
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,

  // Actions
  setUser: (user) =>
    set(() => ({
      user,
      isAuthenticated: !!user,
    })),

  setTokens: (tokens) =>
    set(() => ({
      tokens,
    })),

  setAuth: (user, tokens) =>
    set(() => {
      // Store tokens in localStorage
      if (tokens.accessToken) {
        localStorage.setItem('accessToken', tokens.accessToken);
      }
      if (tokens.refreshToken) {
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }

      return {
        user,
        tokens,
        isAuthenticated: true,
      };
    }),

  clearAuth: () =>
    set(() => {
      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return {
        user: null,
        tokens: null,
        isAuthenticated: false,
      };
    }),

  setIsLoading: (isLoading) =>
    set(() => ({
      isLoading,
    })),
}));
