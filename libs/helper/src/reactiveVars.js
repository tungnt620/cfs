import { makeVar } from '@apollo/client';

export const setCurrentUser = makeVar({});
export const showLoginPopup = makeVar(false);
export const showRegisterPopup = makeVar(false);
export const setNewCfsCreatedByMe = makeVar(undefined);
