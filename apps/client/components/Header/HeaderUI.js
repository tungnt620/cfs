import React from 'react';
import { useState, useCallback } from 'react';
import { MenuOpen, MenuClose } from '@cfs/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Menu } from 'antd';
import LoginPopup from '../LoginPopup';
import {
  useLogoutMutation,
  useSharedQuery,
} from '@cfs/graphql';
import { useApolloClient } from '@apollo/react-hooks';

const HeaderUI = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const client = useApolloClient();
  const [logout] = useLogoutMutation();
  const { data: shareData } = useSharedQuery({ ssr: false });

  const handleLogout = useCallback(() => {
    const reset = async () => {
      try {
        await logout();
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

  const toggleLoginPopupVisible = useCallback(() => {
    setLoginPopupVisible((prev) => !prev);
  }, []);

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

        <div>
          <Link href="/new">
            <a>
              <Button type="primary">Viết bài</Button>
            </a>
          </Link>

          {shareData?.currentUser?.id ? (
            <Button onClick={handleLogout} type="link">
              Đăng xuất
            </Button>
          ) : (
            <Button onClick={toggleLoginPopupVisible} type="link">
              Đăng nhập
            </Button>
          )}

          {loginPopupVisible && (
            <LoginPopup toggleVisible={toggleLoginPopupVisible} />
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
