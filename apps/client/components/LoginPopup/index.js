import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Button, Form, Input, Modal, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { extractError, getCodeFromError } from '@cfs/helper';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '@cfs/graphql';
import { setCurrentUser, showLoginPopup, showRegisterPopup } from '@cfs/helper';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

const LoginPopup = () => {
  const [error, setError] = useState(undefined);
  const [form] = useForm();
  const [login] = useLoginMutation({});

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleSubmit = useCallback(
    async (values) => {
      setError(null);
      try {
        const loginResp = await login({
          variables: {
            username: values.username,
            password: values.password,
          },
        });
        setCurrentUser(loginResp.data.login.user);
        notification.success({
          message: `Đăng nhập thành công`,
          placement: 'bottomRight',
          duration: 3,
        });
        showLoginPopup(false);
      } catch (e) {
        const code = getCodeFromError(e);
        if (code === 'CREDS') {
          form.setFields([
            {
              name: 'password',
              value: form.getFieldValue('password'),
              errors: ['Tên đăng nhập hoặc mật khẩu không đúng'],
            },
          ]);
          setSubmitDisabled(true);
        } else {
          setError(e);
        }
      }
    },
    [form, login]
  );

  const focusElement = useRef(null);
  useEffect(() => void (focusElement.current && focusElement.current.focus()), [
    focusElement,
  ]);

  const handleValuesChange = useCallback(() => {
    setSubmitDisabled(hasErrors(form.getFieldsError().length !== 0));
  }, [form]);

  const code = getCodeFromError(error);

  return (
    <Modal
      title="Đăng nhập"
      visible={true}
      onCancel={() => showLoginPopup(false)}
      footer={null}
    >
      <Alert
        type="error"
        message={`Thực sự xin lỗi các bạn`}
        description={
          <div>
            Hiện tại chức năng đăng kí/đăng nhập đang có vấn để, mình xin phép
            tạm đóng để sửa chữa.
            <p>Sẽ nhanh thôi!</p>
            <p>
              Cảm ơn các bạn.
            </p>
          </div>
        }
        style={{marginBottom: '20px'}}
      />
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
            disabled={true}
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
            disabled={true}
          />
        </Form.Item>

        {error ? (
          <Form.Item>
            <Alert
              type="error"
              message={`Đăng nhập thất bại`}
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
          <Button
            type="primary"
            htmlType="submit"
            disabled={submitDisabled || true}
          >
            Đăng nhập
          </Button>
          <Button
            type="link"
            onClick={() => {
              showRegisterPopup(true);
              showLoginPopup(false);
            }}
            disabled={true}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginPopup;
