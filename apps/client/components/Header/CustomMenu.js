import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { showFeedbacksModal } from '@cfs/helper';

const CustomMenu = ({ menuOpened, toggleMenu }) => {
  const openFeedbacksModal = useCallback(() => showFeedbacksModal(true), []);

  return (
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
          <Link href="/?dataType=comment">
            <a>Bình luận mới nhất</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <div onClick={openFeedbacksModal} className="flex items-center justify-center">
            <BulbOutlined className="pr-1" /> Gửi góp ý
          </div>
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default React.memo(CustomMenu);
