import React, { useState, useEffect, useRef } from 'react';
import { useReactiveVar } from '@apollo/react-hooks';
import { setLatestCommentIDGetByMe } from '../index';
import { LATEST_COMMENT_ID_USER_SAW_LOCAL_STORAGE_KEY } from '@cfs/common';

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
