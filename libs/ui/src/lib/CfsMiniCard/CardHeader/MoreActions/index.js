import React, { useCallback, useState } from 'react';
import { Modal } from 'antd';

const MoreActions = () => {
  const [modalDisplayed, setModalDisplayed] = useState(false);

  const toggle = useCallback(() => {
    setModalDisplayed((prev) => !prev);
  }, []);

  return (
    <>
      <div
        onClick={toggle}
        className="icon icon-three-dot-horizontal pl-2 pr-2 cursor-pointer"
      />
      <Modal
        visible={modalDisplayed}
        onCancel={toggle}
        centered={true}
        maskClosable={true}
        closable={true}
        footer={null}
      >
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      </Modal>
    </>
  );
};

export default MoreActions;
