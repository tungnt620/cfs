import React, { useCallback, useState } from 'react';
import { Comment, Tooltip } from 'antd';
import CommentEditor from './CommentEditor';
import { UserOutlined } from '@ant-design/icons';
import Vote from '../CfsMiniCard/CardActions/Vote';
import dayjs from 'dayjs';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const NestedComment = ({ children }) => {
  const [isShowCommentEditor, setIsShowCommentEditor] = useState(false);

  const toggleShowComment = useCallback(() => {
    setIsShowCommentEditor((prev) => !prev);
  }, []);

  return (
    <Comment
      className="custom-ant-comments"
      actions={[
        <div className="flex items-center">
          <Vote voteNo={82} />
          <span key="comment-nested-reply-to" onClick={toggleShowComment}>
            Trả lời
          </span>
        </div>,
      ]}
      author={<span>Tung</span>}
      avatar={<UserOutlined className="text-lg" />}
      content={
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure).
        </p>
      }
      datetime={
        <Tooltip
          title={dayjs().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}
        >
          <span>{dayjs().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      }
    >
      {isShowCommentEditor && <CommentEditor onClose={toggleShowComment} />}
      {children}
    </Comment>
  );
};

export default NestedComment;
