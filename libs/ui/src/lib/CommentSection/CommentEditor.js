import React, { useCallback, useState } from 'react';
import { Form, Button, Input } from 'antd';

const { TextArea } = Input;

const CommentEditor = ({ onClose }) => {
  const [content, setContent] = useState('');

  const clear = useCallback(() => setContent(''), []);
  const onChangeWrap = useCallback((e) => setContent(e.target.value), []);

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

          <Button type="primary" size="large" disabled={!content?.length}>
            Thêm
          </Button>
        </div>
      </Form.Item>
    </div>
  );
};

export default CommentEditor;
