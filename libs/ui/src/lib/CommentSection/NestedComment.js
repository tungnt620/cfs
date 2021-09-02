import React, { useCallback, useState } from 'react';
import { Button, Comment, Image as AntdImage, Tooltip } from 'antd';
import CreateCommentEditor from './CreateCommentEditor';
import { UserOutlined } from '@ant-design/icons';
import Vote from '../CfsMiniCard/CardActions/Vote';
import dayjs from 'dayjs';
import Image from 'next/image';
import style from './CommentSection.module.scss';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '../../../../helper/src/reactiveVars';
import UpdateCommentEditor from './UpdateCommentEditor';
import useBooleanToggle from '../../../../helper/src/hooks';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const NestedComment = ({ comment, idChildrenComments, cfsId }) => {
  const [expandedThumbnail, toggleExpandedThumbnail] = useBooleanToggle(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isShowCommentEditor, setIsShowCommentEditor] = useState(false);
  const currentUser = useReactiveVar(setCurrentUser);

  const toggleShowComment = useCallback(() => {
    setIsShowCommentEditor((prev) => !prev);
  }, []);

  return (
    <Comment
      className="custom-ant-comments"
      actions={[
        <div className="flex items-center">
          <Vote
            voteNo={comment.totalReaction}
            commentId={comment.id}
            oldUserAction={comment.userCommentReaction?.nodes?.[0]?.reactType}
          />
          <span
            key="comment-nested-reply-to"
            className="cursor-pointer"
            onClick={toggleShowComment}
          >
            Trả lời
          </span>
          {currentUser?.username &&
            currentUser?.username === comment.user?.username && (
              <Button
                onClick={() => setIsEditMode((prev) => !prev)}
                type="link"
              >
                Sửa
              </Button>
            )}
        </div>,
      ]}
      author={<span>{comment.user?.username ?? comment.authorName}</span>}
      avatar={<UserOutlined className="text-lg" />}
      content={
        isEditMode ? (
          <UpdateCommentEditor
            comment={comment}
            onClose={() => setIsEditMode(false)}
          />
        ) : (
          <>
            {expandedThumbnail ? (
              <div className="flex items-center justify-center">
                <AntdImage src={comment.image} />
              </div>
            ) : (
              comment.image && (
                <div className={`relative w-full ${style.minHeight200px}`}>
                  <Image
                    className="cursor-pointer"
                    src={comment.image}
                    layout="fill"
                    objectFit="contain"
                    onClick={toggleExpandedThumbnail}
                  />
                </div>
              )
            )}
            {comment.content}
          </>
        )
      }
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
        <CreateCommentEditor
          cfsId={cfsId}
          parentId={comment.id}
          onClose={toggleShowComment}
        />
      )}
    </Comment>
  );
};

export default NestedComment;
