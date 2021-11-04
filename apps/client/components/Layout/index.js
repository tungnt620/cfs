import React, { useEffect } from 'react';
import {
  setCurrentUser,
  showFeedbacksModal,
  showLoginPopup,
  showPromoteLoginOrRegisterPopup,
  showRegisterPopup,
} from '@cfs/helper';
import { useSharedLazyQuery } from '@cfs/graphql';
import { useReactiveVar } from '@apollo/react-hooks';
import dynamic from 'next/dynamic';
import { Loading } from '@cfs/ui';

const RegisterPopup = dynamic(() => import('../RegisterPopup'), {
  loading: () => <Loading />,
});
const FeedbacksModal = dynamic(() => import('../Feedbacks/FeedbacksModal'), {
  loading: () => <Loading />,
});
const LoginPopup = dynamic(() => import('../LoginPopup'), {
  loading: () => <Loading />,
});
const PromoteLoginOrRegister = dynamic(
  () => import('../PromoteLoginOrRegister'),
  { loading: () => <Loading /> }
);

const MainLayout = ({ children }) => {
  const [getShareData, { data: shareData }] = useSharedLazyQuery();

  const loginPopupVisible = useReactiveVar(showLoginPopup);
  const registerPopupVisible = useReactiveVar(showRegisterPopup);
  const feedbacksModalVisible = useReactiveVar(showFeedbacksModal);
  const promoteLoginOrRegisterPopupVisible = useReactiveVar(
    showPromoteLoginOrRegisterPopup
  );

  useEffect(() => {
    getShareData();
  }, [getShareData]);

  useEffect(() => {
    if (shareData?.currentUser) setCurrentUser(shareData.currentUser);
  }, [shareData?.currentUser]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto my-0">{children}</div>

      {loginPopupVisible && <LoginPopup />}
      {registerPopupVisible && <RegisterPopup />}
      {feedbacksModalVisible && <FeedbacksModal />}
      {promoteLoginOrRegisterPopupVisible && <PromoteLoginOrRegister />}
    </>
  );
};

export default MainLayout;
