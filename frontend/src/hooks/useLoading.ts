import { useState } from 'react';

/**
 * Custom hook for managing loading states
 */
export const useLoading = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading,
  };
};
