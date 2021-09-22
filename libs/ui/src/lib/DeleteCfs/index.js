import React from 'react';
import { setNewDeletedCfsByMe } from '@cfs/helper';
import { useDeleteCfsMutation } from '@cfs/graphql';
import { Button, Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const DeleteCfs = ({ cfs, callback }) => {
  const [deleteCfs] = useDeleteCfsMutation();

  const onDeleteCfs = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xoá bài này không?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await deleteCfs({
            variables: {
              cfsId: cfs?.id,
            },
          });
          notification.success({
            message: `Bạn đã xoá thành công`,
            placement: 'bottomRight',
            duration: 3,
          });
          setNewDeletedCfsByMe(cfs);
          callback?.();
        } catch (e) {
          notification.error({
            message: `Đã có lỗi khi xoá bài, bạn hãy thử lại xem`,
            placement: 'bottomRight',
            duration: 3,
          });
        }
      },
    });
  };

  return (
    <Button type="link" danger={true} onClick={onDeleteCfs}>
      Xoá bài này
    </Button>
  );
};

export default DeleteCfs;
