import { makeVar } from '@apollo/client';
import {
  LATEST_CFS_ID_USER_SAW_LOCAL_STORAGE_KEY,
  LATEST_COMMENT_ID_USER_SAW_LOCAL_STORAGE_KEY,
} from '@cfs/common';

const isClient = typeof window !== 'undefined';

export const setCurrentUser = makeVar({});
export const showLoginPopup = makeVar(false);
export const showRegisterPopup = makeVar(false);
export const showFeedbacksModal = makeVar(false);
export const setNewCfsCreatedByMe = makeVar(undefined);
export const setNewDeletedCfsByMe = makeVar(undefined);
export const setNewCommentCreatedByMe = makeVar(undefined);
export const setNewFeedbackCreatedByMe = makeVar(undefined);
export const setLatestCommentIDGetByMe = makeVar(
  isClient
    ? parseInt(
        localStorage.getItem(LATEST_COMMENT_ID_USER_SAW_LOCAL_STORAGE_KEY) || 0
      )
    : undefined
);
export const setLatestCfsIDGetByMe = makeVar(
  isClient
    ? parseInt(
        localStorage.getItem(LATEST_CFS_ID_USER_SAW_LOCAL_STORAGE_KEY) || 0
      )
    : undefined
);
