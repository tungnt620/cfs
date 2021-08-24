import React, { useCallback, useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import { useCreateCommentMutation } from '@cfs/graphql';
import { setNewCommentCreatedByMe } from '../../../../helper/src/reactiveVars';

const { TextArea } = Input;

const CommentEditor = ({ onClose, cfsId, parentId }) => {
  const [content, setContent] = useState('');
  const [createComment, { loading }] = useCreateCommentMutation();

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
        message.success('Bình luận của bạn đã được thêm');
        setNewCommentCreatedByMe(comment);
      }
    );
  }, [cfsId, content, createComment, parentId]);

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
            disabled={!content?.length}
          >
            Thêm
          </Button>
        </div>
      </Form.Item>
    </div>
  );
};

export default CommentEditor;
