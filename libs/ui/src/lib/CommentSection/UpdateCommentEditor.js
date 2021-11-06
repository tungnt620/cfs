import React, { useCallback, useState } from 'react';
import { useUpdateCommentMutation } from '@cfs/graphql';
import { Box, Button, FormControl, Textarea, useToast } from '@chakra-ui/react';

const UpdateCommentEditor = ({ comment, onClose }) => {
  const [content, setContent] = useState(comment.content);
  const [updateComment, { loading }] = useUpdateCommentMutation();
  const toast = useToast();

  const clear = useCallback(() => setContent(''), []);
  const onChangeWrap = useCallback((e) => setContent(e.target.value), []);

  const addNewComment = useCallback(() => {
    updateComment({
      variables: {
        id: comment.id,
        content,
        image: '',
      },
    }).then(
      ({
        data: {
          updateComment: { comment: updatedComment },
        },
      }) => {
        toast({
          title: 'Bình luận của bạn đã được cập nhật',
          position: 'top',
          isClosable: true,
          status: 'success',
        });
        onClose();
      }
    );
  }, [comment.id, content, onClose, toast, updateComment]);

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
            onClick={addNewComment}
            isDisabled={!content?.length || content === comment.content}
          >
            Cập nhật
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default UpdateCommentEditor;
