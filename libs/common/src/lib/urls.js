import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useGoBack = () => {
  const router = useRouter();

  return useCallback(() => router.back(), []);
};
