import React, { useCallback, useState } from 'react';
import emptyImage from '../images/empty.png';
import { Box, Image as ChakraImage } from '@chakra-ui/react';
import CreateCommentEditor from './CreateCommentEditor';
import Vote from '../CfsMiniCard/CardActions/Vote';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper/reactiveVars';
import UpdateCommentEditor from './UpdateCommentEditor';
import { useBooleanToggle } from '@cfs/helper/hooks';
import { Button } from '@chakra-ui/react';
import Comment from '../common/Comment';

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

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const onCloseEditMode = useCallback(() => {
    setIsEditMode(false);
  }, []);

  return (
    <Comment
      mb={6}
      content={
        isEditMode ? (
          <UpdateCommentEditor comment={comment} onClose={onCloseEditMode} />
        ) : (
          <>
            {expandedThumbnail ? (
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <ChakraImage
                  alt="Ảnh trong comment"
                  src={comment.image}
                  fallbackSrc={emptyImage}
                />
              </Box>
            ) : (
              comment.image && (
                <Box
                  position={'relative'}
                  w={'full'}
                  minH={'200px'}
                  cursor={'pointer'}
                >
                  <Image
                    alt="Ảnh trong comment"
                    src={comment.image}
                    layout="fill"
                    objectFit="contain"
                    onClick={toggleExpandedThumbnail}
                  />
                </Box>
              )
            )}
            {comment.content}
          </>
        )
      }
      username={comment.user?.username ?? comment.authorName}
      time={comment.createdAt}
      actions={
        <Box display={'flex'} alignItems={'center'}>
          <Vote
            voteNo={comment.totalReaction}
            commentId={comment.id}
            oldUserAction={comment.userCommentReaction?.nodes?.[0]?.reactType}
          />
          <Button
            onClick={toggleShowComment}
            variant="ghost"
            fontSize={'0.9rem'}
          >
            Trả lời
          </Button>
          {currentUser?.username &&
            currentUser?.username === comment.user?.username && (
              <Button
                onClick={toggleEditMode}
                variant="ghost"
                fontSize={'0.9rem'}
              >
                Sửa
              </Button>
            )}
        </Box>
      }
    >
      {idChildrenComments[comment.id]?.map((childComment) => (
        <Box pt={4}>
          <NestedComment
            comment={childComment}
            idChildrenComments={idChildrenComments}
            cfsId={cfsId}
          />
        </Box>
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
