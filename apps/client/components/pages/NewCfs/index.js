import React, { useState } from 'react';
import { Button, Input, PageHeader, Row, Select } from 'antd';
import { useGoBack } from '@cfs/common';
import style from './NewCfs.module.scss';

const { TextArea } = Input;

const NewCfs = () => {
  const goBack = useGoBack();
  const [cat, setCat] = useState();

  return (
    <PageHeader
      onBack={goBack}
      title="Chia sẻ, tâm sự"
      extra={[
        <Button type="primary" key="1">
          Gửi
        </Button>,
      ]}
    >
      <div className="mt-4">
        <Row className={style.row}>
          <Select
            className="w-full"
            showSearch
            size="large"
            value={cat}
            onChange={(value) => setCat(value)}
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
        </Row>
        <Row className={style.row}>
          <TextArea
            size="large"
            className="mt-2"
            allowClear={true}
            bordered={false}
            rows={2}
            placeholder="Tiêu đề/ý chính bạn muốn nói"
            maxLength={100}
          />
        </Row>
        <Row className={style.row}>
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
        </Row>
      </div>
    </PageHeader>
  );
};

export default NewCfs;
