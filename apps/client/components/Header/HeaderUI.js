import React, { useCallback, useEffect, useState } from 'react';
import { MenuOpen, MenuClose } from '@cfs/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Menu } from 'antd';
import LoginPopup from '../LoginPopup';
import { useLogoutMutation, useSharedLazyQuery } from '@cfs/graphql';
import { useApolloClient, useReactiveVar } from '@apollo/react-hooks';
import { showFeedbacksModal } from '@cfs/helper';
import { BulbOutlined } from '@ant-design/icons';
import { setCurrentUser, showLoginPopup, showRegisterPopup } from '@cfs/helper';
import RegisterPopup from '../RegisterPopup';
import CreateNewCfs from './CreateNewCfs';
import FeedbacksModal from '../Feedbacks/FeedbacksModal';

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
    setMenuOpened((prev) => !prev);
  }, []);

  const openRegisterPopup = useCallback(() => showRegisterPopup(true), []);
  const openFeedbacksModal = useCallback(() => showFeedbacksModal(true), []);

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
              <Button onClick={handleLogout} type="link">
                Đăng xuất
              </Button>
            ) : (
              <Button onClick={openRegisterPopup} type="link">
                Đăng ký
              </Button>
            )}
          </div>
        </div>
        <nav
          className={`${
            menuOpened ? 'block' : 'hidden'
          } absolute right-0 p-6 h-full-without-header w-full bg-white z-20`}
        >
          <Menu onClick={toggleMenu} className="text-center">
            <Menu.Item>
              <Link href="/all-categories/">
                <a>Tất cả mục confession con</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/">
                <a>Confession mới nhất</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Button type="link" onClick={openFeedbacksModal}>
                <div className="flex items-center">
                  <BulbOutlined className="pr-1" /> Gửi góp ý
                </div>
              </Button>
            </Menu.Item>
          </Menu>
        </nav>
      </nav>

      {loginPopupVisible && <LoginPopup />}
      {registerPopupVisible && <RegisterPopup />}
      {feedbacksModalVisible && <FeedbacksModal />}
    </>
  );
};

export default HeaderUI;
