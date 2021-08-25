import React, { useCallback, useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import { useUpdateCommentMutation } from '@cfs/graphql';

const { TextArea } = Input;

const UpdateCommentEditor = ({ comment, onClose }) => {
  const [content, setContent] = useState(comment.content);
  const [updateComment, { loading }] = useUpdateCommentMutation();

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
        message.success('Bình luận của bạn đã được cập nhật');
        onClose();
      }
    );
  }, [comment.id, content, onClose, updateComment]);

  return (
    <div className="p-2">
      <Form.Item className="mb-2">
        <TextArea
          rows={4}
          onChange={onChangeWrap}
          value={content}
          placeholder="Chia sẻ cảm nghĩ của bạn"
        />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-between">
          <div>
            {onClose ? (
              <Button size="large" onClick={onClose}>
                Huỷ
              </Button>
            ) : (
              <Button size="large" onClick={clear} disabled={!content?.length}>
                Xoá
              </Button>
            )}
          </div>

          <Button
            loading={loading}
            onClick={addNewComment}
            type="primary"
            size="large"
            disabled={!content?.length || content === comment.content}
          >
            Cập nhật
          </Button>
        </div>
      </Form.Item>
    </div>
  );
};

export default UpdateCommentEditor;
