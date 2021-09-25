import React, { useCallback, useState } from 'react';
import { Modal } from 'antd';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper';
import DeleteCfs from '../../../DeleteCfs';

const MoreActions = ({ cfs }) => {
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const currentUser = useReactiveVar(setCurrentUser);

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
          {(currentUser?.isAdmin || cfs?.userId === currentUser?.id) && (
            <DeleteCfs cfs={cfs} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default MoreActions;
