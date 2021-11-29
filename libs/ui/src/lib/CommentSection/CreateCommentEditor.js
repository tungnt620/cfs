import React, { useCallback, useState } from 'react';
import { useCreateCommentMutation } from '@cfs/graphql';
import {
  setCurrentUser,
  setNewCommentCreatedByMe,
  showRegisterWithoutPasswordPopup,
  registerWithoutPasswordPopupNextAction,
} from '@cfs/helper/reactiveVars';
import { useReactiveVar } from '@apollo/react-hooks';
import { Box, Button, FormControl, Textarea, useToast } from '@chakra-ui/react';

const CreateCommentEditor = ({ onClose, cfsId, parentId }) => {
  const [content, setContent] = useState('');
  const [createComment, { loading }] = useCreateCommentMutation();
  const currentUser = useReactiveVar(setCurrentUser);
  const toast = useToast();

  const clear = useCallback(() => setContent(''), []);
  const onChangeWrap = useCallback((e) => setContent(e.target.value), []);

  const addNewComment = useCallback(() => {
    createComment({
      variables: {
        confessionId: cfsId,
        content,
        parentId,
      },
    }).then(
      ({
        data: {
          createComment: { comment },
        },
      }) => {
        toast({
          title: 'Bình luận của bạn đã được gửi',
          position: 'top',
          isClosable: true,
          status: 'success',
        });
        setNewCommentCreatedByMe({ ...comment, cfsId });
        setContent('');
      }
    );
  }, [cfsId, content, createComment, parentId, toast]);

  const onClickSendBtn = useCallback(() => {
    if (!currentUser?.id) {
      showRegisterWithoutPasswordPopup(true);
      registerWithoutPasswordPopupNextAction(() => addNewComment);
    } else {
      addNewComment();
    }
  }, [addNewComment, currentUser?.id]);

  return (
    <Box p={2}>
      <FormControl mb={2}>
        <Textarea
          rows={4}
          onChange={onChangeWrap}
          value={content}
          placeholder="Chia sẻ cảm nghĩ của bạn"
        />
      </FormControl>
      <FormControl>
        <Box display={'flex'} justifyContent={'space-between'}>
          <div>
            {onClose ? (
              <Button onClick={onClose}>Huỷ</Button>
            ) : (
              <Button onClick={clear} disabled={!content?.length}>
                Xoá
              </Button>
            )}
          </div>

          <Button
            isLoading={loading}
            onClick={onClickSendBtn}
            isDisabled={!content?.length}
          >
            Gửi
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default CreateCommentEditor;
