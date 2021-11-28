import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReactiveVar } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { LATEST_COMMENT_ID_USER_SAW_LOCAL_STORAGE_KEY } from '@cfs/common/constants';
import { setLatestCommentIDGetByMe } from '../reactiveVars';

export function useBooleanToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}

export function usePreviousValue(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const useSetLatestCommentIDUserSaw = (offset, comments) => {
  const currentLatestCommentIDUserSaw = useReactiveVar(
    setLatestCommentIDGetByMe
  );

  useEffect(() => {
    if (offset === 0 && comments?.length > 0) {
      const latestCommentID =
        comments[0].id > comments[comments.length - 1].id
          ? comments[0].id
          : comments[comments.length - 1].id;

      if (latestCommentID > currentLatestCommentIDUserSaw) {
        setLatestCommentIDGetByMe(latestCommentID);
        localStorage.setItem(
          LATEST_COMMENT_ID_USER_SAW_LOCAL_STORAGE_KEY,
          latestCommentID.toString()
        );
      }
    }
  }, [comments]);
};

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
