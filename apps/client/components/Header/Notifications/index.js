import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge, List, Popover, Tooltip } from 'antd';
import { useReactiveVar } from '@apollo/react-hooks';
import { setLatestCommentIDGetByMe, setLatestCfsIDGetByMe } from '@cfs/helper';
import { useRouter } from 'next/router';

const notificationBadgeOffset = [-5, 0];

const Notification = ({ shareData }) => {
  const router = useRouter();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const currentLatestCommentIDUserSaw = useReactiveVar(
    setLatestCommentIDGetByMe
  );
  const currentLatestCfsIDUserSaw = useReactiveVar(setLatestCfsIDGetByMe);

  const [isHaveNewCfs, setIsHaveNewCfs] = useState(false);
  const [isHaveNewComment, setIsHaveNewComment] = useState(false);

  useEffect(() => {
    const latestCfsId = shareData?.confessions?.nodes?.[0]?.id;
    if (latestCfsId) {
      setIsHaveNewCfs(currentLatestCfsIDUserSaw < latestCfsId);
    }
  }, [currentLatestCfsIDUserSaw, shareData?.confessions]);

  useEffect(() => {
    const latestCommentId = shareData?.comments?.nodes?.[0]?.id;
    if (latestCommentId) {
      setIsHaveNewComment(currentLatestCommentIDUserSaw < latestCommentId);
    }
  }, [currentLatestCommentIDUserSaw, shareData?.comments]);

  const notifications = [
    {
      text: 'Có confession mới. Nhấn để xem ngay',
      unread: isHaveNewCfs,
      url: '/?dataType=confession&cat=0',
    },
    {
      text: 'Có bình luận mới. Nhấn để xem ngay',
      unread: isHaveNewComment,
      url: '/?dataType=comment',
    },
  ];

  return (
    <Popover
      content={
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                router.push(item.url);
                setIsPopoverVisible(false);
              }}
            >
              <Badge dot={item.unread} offset={[5, 0]}>
                <span className={item.unread ? 'font-bold cursor-pointer' : 'cursor-pointer'}>
                  {item.text}
                </span>
              </Badge>
            </List.Item>
          )}
        />
      }
      trigger="click"
      visible={isPopoverVisible}
      onVisibleChange={setIsPopoverVisible}
    >
      <Tooltip title="thông báo">
        <Badge
          dot={isHaveNewComment || isHaveNewCfs}
          offset={notificationBadgeOffset}
          className="flex items-center pr-2 pl-3 text-xl cursor-pointer"
        >
          <BellOutlined />
        </Badge>
      </Tooltip>
    </Popover>
  );
};

export default Notification;
