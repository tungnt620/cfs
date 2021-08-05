import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Button, Form, Input, Modal, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { extractError, getCodeFromError } from '@cfs/helper';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '@cfs/graphql';
import {
  setCurrentUser,
  showLoginPopup,
  showRegisterPopup,
} from '../../../../libs/helper/src/reactiveVars';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

const RegisterPopup = () => {
  const [error, setError] = useState(undefined);
  const [form] = useForm();
  const [register] = useRegisterMutation({});

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleSubmit = useCallback(
    async (values) => {
      setError(null);
      try {
        const registerResp = await register({
          variables: {
            username: values.username,
            password: values.password,
            email: `${values.username}@b.c`,
          },
        });
        setCurrentUser(registerResp.data.register.user);
        notification.success({
          message: `Đăng kí tài khoản thành công`,
          placement: 'bottomRight',
          duration: 3,
        });
        showRegisterPopup(false);
      } catch (e) {
        const code = getCodeFromError(e);
        if (code === 'NUNIQ') {
          form.setFields([
            {
              name: 'username',
              value: form.getFieldValue('username'),
              errors: ['Tên đăng nhập đã tồn tại'],
            },
          ]);
          setSubmitDisabled(true);
        } else if (code === 'WEAKP') {
          form.setFields([
            {
              name: 'password',
              value: form.getFieldValue('password'),
              errors: ['Mật khẩu phải có ít nhất 8 kí tự'],
            },
          ]);
          setSubmitDisabled(true);
        } else {
          setError(e);
        }
      }
    },
    [form, register]
  );

  const focusElement = useRef(null);
  useEffect(() => focusElement.current?.focus(), [focusElement]);

  const handleValuesChange = useCallback(() => {
    setSubmitDisabled(hasErrors(form.getFieldsError().length !== 0));
  }, [form]);

  const code = getCodeFromError(error);

  return (
    <Modal
      title="Đăng kí tài khoản"
      visible={true}
      onCancel={() => showRegisterPopup(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
        style={{ width: '100%' }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Hãy nhập tài khoản' }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Tài khoản đăng nhập"
            autoComplete="username"
            ref={focusElement}
            data-cy="loginpage-input-username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            size="large"
            type="password"
            placeholder="Mật khẩu"
            autoComplete="current-password"
            data-cy="loginpage-input-password"
          />
        </Form.Item>

        {error ? (
          <Form.Item>
            <Alert
              type="error"
              message={`Đăng kí tài khoản thất bại`}
              description={
                <span>
                  {extractError(error).message}
                  {code ? (
                    <span>
                      (Error code: <code>ERR_{code}</code>)
                    </span>
                  ) : null}
                </span>
              }
            />
          </Form.Item>
        ) : null}
        <Form.Item className="mt-4">
          <Button type="primary" htmlType="submit" disabled={submitDisabled}>
            Đăng kí
          </Button>
          <Button
            type="link"
            onClick={() => {
              showRegisterPopup(false);
              showLoginPopup(true);
            }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterPopup;
