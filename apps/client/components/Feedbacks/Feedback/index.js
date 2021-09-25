import React from 'react';
import { Comment, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Feedback = ({ feedback }) => {
  const currentUser = useReactiveVar(setCurrentUser);

  return (
    <Comment
      className="custom-ant-feedbacks"
      author={<span>{currentUser?.username}</span>}
      avatar={<UserOutlined className="text-lg" />}
      content={feedback.content}
      datetime={
        <Tooltip
          title={dayjs(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        >
          <span>{dayjs(feedback.createdAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Feedback;
