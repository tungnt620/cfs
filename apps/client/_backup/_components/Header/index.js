import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';

const Header = (props) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpened((prev) => !prev);
  }, []);

  return (
    <header>
      <nav className="bg-main-color">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                {menuOpened ? (
                  <>
                    <span className="sr-only">Đóng menu chính</span>
                    <Image
                      src="/images/x.svg"
                      alt="close menu icon"
                      className="h-6 w-6"
                      aria-hidden="true"
                      width={40}
                      height={40}
                      onClick={toggleMenu}
                    />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Mở menu chính</span>
                    <Image
                      src="/images/open_menu.svg"
                      alt="open menu icon"
                      className="h-6 w-6"
                      aria-hidden="true"
                      width={40}
                      height={40}
                      onClick={toggleMenu}
                    />
                  </>
                )}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <a className="block lg:hidden">
                    <Image
                      src="/images/logo_mobile.png"
                      alt="confession"
                      height={50}
                      width={50}
                    />
                  </a>
                </Link>
                <Link href="/">
                  <a className="hidden lg:block">
                    <img
                      className="h-8 w-auto"
                      src="/images/logo_pc.png"
                      alt="confession"
                    />
                  </a>
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4" />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white px-3 py-2 rounded-md border">
                Chia sẻ
              </button>
            </div>
          </div>
        </div>

        <div className={`${menuOpened ? 'block' : 'hidden'} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <a
              href="#"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
