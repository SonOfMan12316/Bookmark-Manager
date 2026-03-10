import { useEffect } from 'react';
import { useCurrentUser } from './api/useAuth';
import { useAuthStore } from '../store/auth.store';

/**
 * Main auth hook that combines store and API
 */
export function useAuth() {
  const { user, isAuthenticated, isLoading: storeLoading } = useAuthStore();
  const {
    data: currentUser,
    isLoading: queryLoading,
    isError,
  } = useCurrentUser();

  // Sync query data with store
  useEffect(() => {
    if (currentUser) {
      useAuthStore.getState().setUser(currentUser);
    }
  }, [currentUser]);

  return {
    user: user || currentUser,
    isAuthenticated: isAuthenticated || !!currentUser,
    isLoading: storeLoading || queryLoading,
    isError,
  };
}
