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
import { Box } from '@chakra-ui/react';

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
      <Box mx={'auto'} my={0} pl={2} pr={2} pb={4} maxW={'1280px'}>
        {children}
      </Box>

      {loginPopupVisible && <LoginPopup />}
      {registerPopupVisible && <RegisterPopup />}
      {feedbacksModalVisible && <FeedbacksModal />}
      {promoteLoginOrRegisterPopupVisible && <PromoteLoginOrRegister />}
    </>
  );
};

export default MainLayout;
