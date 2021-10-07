import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function usePagination() {
  const router = useRouter();

  const offset = parseInt(isNaN(router.query.offset) ? 0 : router.query.offset);

  const goNextPage = useCallback(() => {
    router.query.offset = offset + 10;
    router.push(router);
  }, [offset, router]);

  const goPreviousPage = useCallback(() => {
    if (offset >= 10) {
      router.query.offset = offset - 10;
      router.push(router);
    }
  }, [offset, router]);

  const resetPagination = useCallback(() => {
    router.query.offset = '0';
    router.push(router);
  }, [router]);

  return {
    offset,
    goPreviousPage,
    goNextPage,
    resetPagination,
  };
}
