import { useEffect, useRef } from 'react';

/**
 * Custom hook to detect if component is mounted
 * Useful for preventing state updates on unmounted components
 */
export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};
