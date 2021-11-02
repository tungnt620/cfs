import React, { useCallback, useState } from 'react';
import { Form, Input } from 'antd';
import { useCreateFeedbackMutation } from '@cfs/graphql';
import {
  setCurrentUser,
  showLoginPopup,
  setNewFeedbackCreatedByMe,
} from '@cfs/helper';
import { useReactiveVar } from '@apollo/react-hooks';
import { Button, useToast } from '@chakra-ui/react';

const { TextArea } = Input;

const CreateFeedback = () => {
  const [content, setContent] = useState('');
  const [createFeedback, { loading }] = useCreateFeedbackMutation();
  const currentUser = useReactiveVar(setCurrentUser);
  const toast = useToast();

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
          toast({
            title: `Góp ý của bạn đã được gửi thành công! Cảm ơn bạn. Mình sẽ phản hồi bạn sớm.`,
            position: 'top',
            isClosable: true,
            status: 'success',
          });
          setNewFeedbackCreatedByMe(feedback);
          setContent('');
        }
      );
    }
  }, [content, createFeedback, currentUser?.id, toast]);

  return (
    <div className="p-2 mt-4">
      <Form.Item className="mb-2">
        <TextArea
          rows={4}
          onChange={onChangeWrap}
          value={content}
          placeholder="Xin nhận các góp ý của bạn để làm Confession.vn trở nên tốt đẹp hơn."
        />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-between">
          <Button onClick={clear} disabled={!content?.length} variant="outline">
            Xoá
          </Button>

          <Button
            isLoading={loading}
            onClick={addNewFeedback}
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
