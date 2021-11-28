import React from 'react';
import { setNewDeletedCfsByMe } from '@cfs/helper/reactiveVars';
import { useDeleteCfsMutation } from '@cfs/graphql';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

const DeleteCfs = ({ cfs, callback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = React.useRef();

  const [deleteCfs] = useDeleteCfsMutation();

  const onDeleteCfs = async () => {
    try {
      await deleteCfs({
        variables: {
          cfsId: cfs?.id,
        },
      });
      toast({
        title: 'Bạn đã xoá thành công',
        position: 'top',
        isClosable: true,
        status: 'success',
      });
      setNewDeletedCfsByMe(cfs);
      callback?.();
      onClose();
    } catch (e) {
      toast({
        title: 'Đã có lỗi khi xoá bài, bạn hãy thử lại xem',
        position: 'top',
        isClosable: true,
        status: 'error',
      });
    }
  };

  return (
    <>
      <Button colorScheme="red" variant={'link'} onClick={onOpen}>
        Xoá bài này
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody>
              Bạn có chắc muốn xoá bài này không?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Thôi
              </Button>
              <Button colorScheme="red" onClick={onDeleteCfs} ml={3}>
                Có
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCfs;
