import React, { useCallback, useMemo, useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const sampleItems = [
  { name: 'Tất cả', id: 1 },
  { name: 'Đang theo dõi', id: 2 },
  { name: 'Đang hot', id: 3 },
  { name: 'Bài mới', id: 4 },
];

const DropdownX = ({ onChange, items = sampleItems }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [value, setValue] = useState(items?.[0]);

  const onMenuItemClick = useCallback(
    ({ key }) => {
      const item = items.find((i) => i.id?.toString() === key);
      if (item) {
        setValue(item);
        onChange?.(item);
        setIsShowMenu(false);
      }
    },
    [items, onChange]
  );

  const menu = useMemo(
    () => (
      <Menu onClick={onMenuItemClick} onSelect={onMenuItemClick}>
        {items.map((item) => (
          <Menu.Item key={item.id}>{item.name}</Menu.Item>
        ))}
      </Menu>
    ),
    [items, onMenuItemClick]
  );

  const handleVisibleChange = useCallback((flag) => {
    setIsShowMenu(flag);
  }, []);

  return (
    <Dropdown
      overlay={menu}
      visible={isShowMenu}
      onVisibleChange={handleVisibleChange}
    >
      <Button>
        {value.name} <DownOutlined />
      </Button>
    </Dropdown>
  );
};
export default DropdownX;
