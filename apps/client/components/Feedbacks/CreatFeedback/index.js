import React, { useCallback, useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import { useCreateFeedbackMutation } from '@cfs/graphql';
import {
  setCurrentUser,
  showLoginPopup,
  setNewFeedbackCreatedByMe,
} from '@cfs/helper';
import { useReactiveVar } from '@apollo/react-hooks';

const { TextArea } = Input;

const CreateFeedback = () => {
  const [content, setContent] = useState('');
  const [createFeedback, { loading }] = useCreateFeedbackMutation();
  const currentUser = useReactiveVar(setCurrentUser);

  const clear = useCallback(() => setContent(''), []);
  const onChangeWrap = useCallback((e) => setContent(e.target.value), []);

  const addNewFeedback = useCallback(() => {
    if (!currentUser?.id) {
      showLoginPopup(true);
    } else {
      createFeedback({
        variables: {
          content,
        },
      }).then(
        ({
          data: {
            createFeedback: { feedback },
          },
        }) => {
          message.success(
            'Góp ý của bạn đã được gửi thành công! Cảm ơn bạn. Mình sẽ phản hồi bạn sớm.',
            1.5
          );
          setNewFeedbackCreatedByMe(feedback);
          setContent('');
        }
      );
    }
  }, [content, createFeedback, currentUser?.id]);

  return (
    <div className="p-2 mt-4">
      <Form.Item className="mb-2">
        <TextArea
          rows={4}
          onChange={onChangeWrap}
          value={content}
          placeholder="Góp ý của bạn về website, ý tưởng mới, tính năng cần sửa chữa, ... Mình luôn lắng nghe và sẽ phản hồi."
        />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-between">
          <Button size="large" onClick={clear} disabled={!content?.length}>
            Xoá
          </Button>

          <Button
            loading={loading}
            onClick={addNewFeedback}
            type="primary"
            size="large"
            disabled={!content?.length}
          >
            {currentUser?.id ? 'Gửi' : 'Đăng nhập để để gửi'}
          </Button>
        </div>
      </Form.Item>
    </div>
  );
};

export default CreateFeedback;
