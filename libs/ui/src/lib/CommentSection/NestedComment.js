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

const NestedComment = ({ comment, idChildrenComments, cfsId }) => {
  const [isShowCommentEditor, setIsShowCommentEditor] = useState(false);

  const toggleShowComment = useCallback(() => {
    setIsShowCommentEditor((prev) => !prev);
  }, []);

  return (
    <Comment
      className="custom-ant-comments"
      actions={[
        <div className="flex items-center">
          <Vote voteNo={0} />
          <span key="comment-nested-reply-to" onClick={toggleShowComment}>
            Trả lời
          </span>
        </div>,
      ]}
      author={<span>{comment.user?.username ?? comment.authorName}</span>}
      avatar={<UserOutlined className="text-lg" />}
      content={<p>{comment.content}</p>}
      datetime={
        <Tooltip title={dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{dayjs(comment.createdAt).fromNow()}</span>
        </Tooltip>
      }
    >
      {idChildrenComments[comment.id]?.map((childComment) => (
        <NestedComment
          comment={childComment}
          idChildrenComments={idChildrenComments}
          cfsId={cfsId}
        />
      ))}
      {isShowCommentEditor && (
        <CommentEditor
          cfsId={cfsId}
          parentId={comment.id}
          onClose={toggleShowComment}
        />
      )}
    </Comment>
  );
};

export default NestedComment;
