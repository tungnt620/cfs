import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { MenuOpen, MenuClose } from '@cfs/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import LoginPopup from '../LoginPopup';
import { useLogoutMutation, useSharedQuery } from '@cfs/graphql';
import { useApolloClient, useReactiveVar } from '@apollo/react-hooks';
import { preventDefault } from '@cfs/helper';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {
  setCurrentUser,
  showLoginPopup,
  showRegisterPopup,
} from '../../../../libs/helper/src/reactiveVars';
import RegisterPopup from '../RegisterPopup';

const HeaderUI = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const { data: shareData } = useSharedQuery();
  const currentUser = useReactiveVar(setCurrentUser);
  const loginPopupVisible = useReactiveVar(showLoginPopup);
  const registerPopupVisible = useReactiveVar(showRegisterPopup);

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

  const openLoginPopup = useCallback(() => showLoginPopup(true), []);

  return (
    <nav className="header-height select-none header-shadow">
      <div className="flex justify-between items-center h-full ml-6 mr-6">
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
            />
          </a>
        </Link>

        <div className="flex">
          <Link href="/new">
            <a>
              <Button type="primary">Viết bài</Button>
            </a>
          </Link>

          {currentUser?.id ? (
            <div className="flex ml-4 items-center">
              <Avatar size={32} icon={<UserOutlined />} className="mr-1" />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Button onClick={handleLogout} type="link">
                        Đăng xuất
                      </Button>
                    </Menu.Item>
                  </Menu>
                }
              >
                <a className="ant-dropdown-link" onClick={preventDefault}>
                  {currentUser?.username} <DownOutlined />
                </a>
              </Dropdown>
            </div>
          ) : (
            <Button onClick={openLoginPopup} type="link">
              Đăng nhập
            </Button>
          )}

          {loginPopupVisible && <LoginPopup />}
          {registerPopupVisible && <RegisterPopup />}
        </div>
      </div>
      <nav
        className={`${
          menuOpened ? 'block' : 'hidden'
        } absolute right-0 p-6 h-full-without-header w-full bg-white z-20`}
      >
        <Menu onClick={toggleMenu} className="text-center">
          <Menu.Item>
            <Link href="/cac-danh-muc">
              <a>Các danh mục</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/cac-danh-muc">
              <a>Nổi bậc</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/cac-danh-muc">
              <a>Mới</a>
            </Link>
          </Menu.Item>
        </Menu>
      </nav>
    </nav>
  );
};

export default HeaderUI;
