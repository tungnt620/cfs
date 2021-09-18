import React, { useEffect, useMemo } from 'react';
import { Alert, Button, Form, Input, message, PageHeader, Select } from 'antd';
import { useGoBack } from '@cfs/common';
import style from './NewCfs.module.scss';
import { useCreateCfsMutation, useGetCategoriesQuery } from '@cfs/graphql';
import slugify from 'slugify';
import { extractError } from '@cfs/helper';
import { setNewCfsCreatedByMe } from '@cfs/helper';
import { useRouter } from 'next/router';

const { TextArea } = Input;

const NewCfs = () => {
  const router = useRouter();
  const goBack = useGoBack();
  const [form] = Form.useForm();
  const { data: getCategoriesData } = useGetCategoriesQuery();
  const [
    createCfs,
    { data: createCfsData, error: createCfsError, loading: createCfsLoading },
  ] = useCreateCfsMutation();

  const categorySelectOptions = useMemo(
    () =>
      getCategoriesData?.categories?.nodes?.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })) ?? [],
    [getCategoriesData]
  );

  const onFinish = (values) => {
    const title = values.title;
    const slug = slugify(title.substring(0, 50), {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      locale: 'vi',
    });
    createCfs({
      variables: {
        ...values,
        slug,
        image: '',
      },
    });
  };

  useEffect(() => {
    if (createCfsData) {
      message.success('Bài của bạn đã được tạo thành công');
      setNewCfsCreatedByMe(createCfsData.createCfs.confession);
      router.push('/');
    }
  }, [createCfsData, router]);

  const onSubmit = () => {
    form.submit();
  };

  return (
    <PageHeader
      onBack={goBack}
      title="Chia sẻ, tâm sự"
      extra={[
        <Button
          type="primary"
          key="1"
          onClick={onSubmit}
          loading={createCfsLoading}
        >
          Gửi
        </Button>,
      ]}
    >
      <div className="mt-4">
        {createCfsError && (
          <Alert message={extractError(createCfsError).message} type="error" />
        )}

        <Form
          name="Create new confession"
          initialValues={{}}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="catId"
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
              options={categorySelectOptions}
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
              placeholder="Tiêu đề/ý chính bạn muốn tâm sự"
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
