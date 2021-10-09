import React, { useCallback, useEffect, useState } from 'react';
import { MenuOpen, MenuClose } from '@cfs/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip } from 'antd';
import LoginPopup from '../LoginPopup';
import { useLogoutMutation, useSharedLazyQuery } from '@cfs/graphql';
import { useApolloClient, useReactiveVar } from '@apollo/react-hooks';
import { showFeedbacksModal } from '@cfs/helper';
import { LogoutOutlined } from '@ant-design/icons';
import { setCurrentUser, showLoginPopup, showRegisterPopup } from '@cfs/helper';
import RegisterPopup from '../RegisterPopup';
import CreateNewCfs from './CreateNewCfs';
import FeedbacksModal from '../Feedbacks/FeedbacksModal';
import Notification from './Notifications';
import CustomMenu from './CustomMenu';
import { sendGAUserBehaviorEvent } from '../../../../libs/helper/src/analytics';

const HeaderUI = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const [getShareData, { data: shareData }] = useSharedLazyQuery();
  const currentUser = useReactiveVar(setCurrentUser);
  const loginPopupVisible = useReactiveVar(showLoginPopup);
  const registerPopupVisible = useReactiveVar(showRegisterPopup);
  const feedbacksModalVisible = useReactiveVar(showFeedbacksModal);

  useEffect(() => {
    getShareData();
  }, [getShareData]);

  useEffect(() => {
    if (shareData?.currentUser) setCurrentUser(shareData.currentUser);
  }, [shareData?.currentUser]);

  const handleLogout = useCallback(() => {
    const reset = async () => {
      try {
        await logout();
        setCurrentUser({});
        await client.resetStore();
      } catch (e) {
        console.error(e);
      }
    };
    reset();
  }, [client, logout]);

  const toggleMenu = useCallback(() => {
    setMenuOpened((prev) => {
      const newValue = !prev;
      if (newValue) {
        sendGAUserBehaviorEvent({
          category: 'header menu',
          action: 'click',
          label: 'Click on header menu',
        });
      }
      return newValue;
    });
  }, [setMenuOpened]);

  return (
    <>
      <nav className="header-height select-none header-shadow">
        <div className="flex justify-between items-center h-full mx-1 sm:mx-6">
          <MenuOpen
            onClick={toggleMenu}
            className={`${
              menuOpened ? 'hidden' : 'block'
            } color1 align-middle h-5 w-5 fill-current cursor-pointer`}
          />
          <MenuClose
            onClick={toggleMenu}
            className={`${
              menuOpened ? 'block' : 'hidden'
            } color1 align-middle h-5 w-5 fill-current cursor-pointer`}
          />
          <Link href="/">
            <a>
              <Image
                src="/images/logo.png"
                width={124}
                height={40}
                className="cursor-pointer"
                alt="Logo"
              />
            </a>
          </Link>

          <div className="flex">
            <CreateNewCfs />

            {currentUser?.id ? (
              <>
                <Notification shareData={shareData} />
                <Tooltip title="Đăng xuất">
                  <LogoutOutlined
                    className="flex items-center pr-2 pl-2 text-xl"
                    onClick={handleLogout}
                  />
                </Tooltip>
              </>
            ) : (
              <Notification shareData={shareData} />
            )}
          </div>
        </div>
        <CustomMenu menuOpened={menuOpened} toggleMenu={toggleMenu} />
      </nav>

      {loginPopupVisible && <LoginPopup />}
      {registerPopupVisible && <RegisterPopup />}
      {feedbacksModalVisible && <FeedbacksModal />}
    </>
  );
};

export default HeaderUI;
