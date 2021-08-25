import React, { useCallback, useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import { useCreateCommentMutation } from '@cfs/graphql';
import {
  setCurrentUser,
  setNewCommentCreatedByMe,
  showLoginPopup,
} from '../../../../helper/src/reactiveVars';
import { useReactiveVar } from '@apollo/react-hooks';

const { TextArea } = Input;

const CreateCommentEditor = ({ onClose, cfsId, parentId }) => {
  const [content, setContent] = useState('');
  const [createComment, { loading }] = useCreateCommentMutation();
  const currentUser = useReactiveVar(setCurrentUser);

  const clear = useCallback(() => setContent(''), []);
  const onChangeWrap = useCallback((e) => setContent(e.target.value), []);

  const addNewComment = useCallback(() => {
    if (!currentUser?.id) {
      showLoginPopup(true);
    } else {
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
          setContent('');
        }
      );
    }
  }, [cfsId, content, createComment, currentUser?.id, parentId]);

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
            {currentUser?.id ? 'Thêm' : 'Đăng nhập để thêm'}
          </Button>
        </div>
      </Form.Item>
    </div>
  );
};

export default CreateCommentEditor;
