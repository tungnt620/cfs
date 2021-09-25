import React from 'react';
import { Modal } from 'antd';
import { showFeedbacksModal } from '@cfs/helper';
import Feedbacks from './index';

const FeedbacksModal = () => {
  return (
    <Modal
      visible={true}
      onCancel={() => showFeedbacksModal(false)}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={null}
    >
      <Feedbacks />
    </Modal>
  );
};

export default FeedbacksModal;
