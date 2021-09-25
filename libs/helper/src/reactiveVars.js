import { makeVar } from '@apollo/client';

export const setCurrentUser = makeVar({});
export const showLoginPopup = makeVar(false);
export const showRegisterPopup = makeVar(false);
export const showFeedbacksModal = makeVar(false);
export const setNewCfsCreatedByMe = makeVar(undefined);
export const setNewDeletedCfsByMe = makeVar(undefined);
export const setNewCommentCreatedByMe = makeVar(undefined);
export const setNewFeedbackCreatedByMe = makeVar(undefined);
