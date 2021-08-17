import React from 'react';
import { Button, Form, Input, PageHeader, Select } from 'antd';
import { useGoBack } from '@cfs/common';
import style from './NewCfs.module.scss';

const { TextArea } = Input;

const NewCfs = () => {
  const goBack = useGoBack();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <PageHeader
      onBack={goBack}
      title="Chia sẻ, tâm sự"
      extra={[
        <Button type="primary" key="1" onClick={onSubmit}>
          Gửi
        </Button>,
      ]}
    >
      <div className="mt-4">
        <Form
          name="Create new confession"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            name="cat"
            rules={[{ required: true, message: 'Hãy điền nơi bạn muốn gửi!' }]}
            className={style.row}
          >
            <Select
              className="w-full"
              showSearch
              size="large"
              placeholder="Chọn nơi bạn muốn gửi"
              optionFilterProp="label"
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.label
                  .toLowerCase()
                  .localeCompare(optionB.label.toLowerCase())
              }
              bordered={false}
              notFoundContent="Hiện tại chưa có loại này"
              options={[
                {
                  value: 1,
                  label: 'tung',
                },
                {
                  value: 2,
                  label: 'nguyen',
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Hãy điền tiêu đề/ý chính bạn muốn nói!',
              },
            ]}
            className={style.row}
          >
            <TextArea
              size="large"
              className="mt-2"
              allowClear={true}
              bordered={false}
              rows={2}
              placeholder="Tiêu đề/ý chính bạn muốn nói"
              maxLength={100}
            />
          </Form.Item>

          <Form.Item
            name="content"
            rules={[
              { required: true, message: 'Hãy điền nội dung bạn muốn tâm sự!' },
            ]}
            className={style.row}
          >
            <TextArea
              size="large"
              className="mt-2"
              allowClear={true}
              bordered={false}
              rows={6}
              autoSize={true}
              placeholder="Nội dung"
              maxLength={5000}
            />
          </Form.Item>
        </Form>
      </div>
    </PageHeader>
  );
};

export default NewCfs;
