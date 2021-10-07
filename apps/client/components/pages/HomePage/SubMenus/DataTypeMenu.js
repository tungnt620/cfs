import React, { useEffect, useState } from 'react';
import { Button, Menu, Popover } from 'antd';
import {
  CommentOutlined,
  DownOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const DataTypeMenu = ({ dataType, setDataType }) => {
  const router = useRouter();
  const [chooseDataTypeVisible, setChooseDataTypeVisible] = useState(false);

  useEffect(() => {
    const dataTypeInUrl = router.query.dataType;
    if (dataTypeInUrl !== dataType) {
      setDataType(dataTypeInUrl || 'confession');
    }
  }, [dataType, router, setDataType]);

  return (
    <Popover
      content={
        <Menu className="border-r-0">
          <Menu.Item
            className="flex items-center"
            onClick={() => {
              setChooseDataTypeVisible(false);
              setDataType('confession');
              router.query.dataType = 'confession';
              router.push(router);
            }}
          >
            <div className="flex items-center">
              <MessageOutlined className="mr-1" />
              <span>Confession</span>
            </div>
          </Menu.Item>
          <Menu.Item
            className="flex items-center"
            onClick={() => {
              setChooseDataTypeVisible(false);
              setDataType('comment');
              router.query.dataType = 'comment';
              router.push(router);
            }}
          >
            <div className="flex items-center">
              <CommentOutlined className="mr-1" />
              <span>Bình luận</span>
            </div>
          </Menu.Item>
        </Menu>
      }
      title="Xem theo"
      trigger="click"
      visible={chooseDataTypeVisible}
      onVisibleChange={setChooseDataTypeVisible}
    >
      <Button type="text" className="pr-0">
        <div className="flex items-center color5">
          {dataType === 'confession' ? (
            <>
              <MessageOutlined className="mr-1" />
              <span>Confession</span>
            </>
          ) : (
            <>
              <CommentOutlined className="mr-1" />
              <span>Bình luận</span>
            </>
          )}
          <DownOutlined className="pl-2" />
        </div>
      </Button>
    </Popover>
  );
};

export default DataTypeMenu;
