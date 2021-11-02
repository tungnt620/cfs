import React from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/react-hooks';
import { showFeedbacksModal } from '@cfs/helper';
import {
  showLoginPopup,
  showRegisterPopup,
  showPromoteLoginOrRegisterPopup,
} from '@cfs/helper';
import CreateNewCfs from './CreateNewCfs';
import CustomMenu from './CustomMenu';
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

const HeaderUI = () => {
  const loginPopupVisible = useReactiveVar(showLoginPopup);
  const registerPopupVisible = useReactiveVar(showRegisterPopup);
  const feedbacksModalVisible = useReactiveVar(showFeedbacksModal);
  const promoteLoginOrRegisterPopupVisible = useReactiveVar(
    showPromoteLoginOrRegisterPopup
  );

  return (
    <>
      <nav className="header-height select-none header-shadow">
        <div className="flex justify-between items-center h-full mx-1 sm:mx-6">
          <CustomMenu />
          <Box ml={4} mr={4} fontStyle="italic">
            Nơi bạn chia sẻ những tâm sự thầm kín
          </Box>
          <Box display="flex">
            <CreateNewCfs />
          </Box>
        </div>
      </nav>

      {loginPopupVisible && <LoginPopup />}
      {registerPopupVisible && <RegisterPopup />}
      {feedbacksModalVisible && <FeedbacksModal />}
      {promoteLoginOrRegisterPopupVisible && <PromoteLoginOrRegister />}
    </>
  );
};

export default HeaderUI;
