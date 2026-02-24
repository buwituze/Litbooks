import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { fetchCurrentUser } from '../features/auth/authSlice';

/**
 * Custom hook for authentication
 * Automatically fetches user data if token exists
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error, token } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Fetch user data if we have a token but no user
    if (token && !user && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [token, user, isLoading, dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};
