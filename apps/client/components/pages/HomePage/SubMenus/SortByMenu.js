import React, { useState } from 'react';
import { Button, Menu, Popover } from 'antd';
import { ClockCircleOutlined, DownOutlined } from '@ant-design/icons';

const SortByMenu = () => {
  const [chooseSortTypeVisible, setChooseSortTypeVisible] = useState(false);

  return (
    <Popover
      content={
        <Menu className="border-r-0">
          <Menu.Item onClick={() => setChooseSortTypeVisible(false)}>
            <div className="flex items-center">
              <ClockCircleOutlined className="pr-2" /> <span>Mới nhất</span>
            </div>
          </Menu.Item>
        </Menu>
      }
      title="Sắp xếp theo"
      trigger="click"
      visible={chooseSortTypeVisible}
      onVisibleChange={setChooseSortTypeVisible}
    >
      <Button type="text" className="pl-0">
        <div className="flex items-center color5">
          <ClockCircleOutlined className="pr-2" /> <span>Mới nhất</span>
          <DownOutlined className="pl-2" />
        </div>
      </Button>
    </Popover>
  );
};

export default SortByMenu;
