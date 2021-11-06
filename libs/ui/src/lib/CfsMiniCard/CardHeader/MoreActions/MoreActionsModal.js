import React from 'react';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper';
import DeleteCfs from '../../../DeleteCfs';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const MoreActionsModal = ({ cfs, setModalDisplayed }) => {
  const currentUser = useReactiveVar(setCurrentUser);

  const onClose = () => {
    setModalDisplayed(false);
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6} pt={6}>
          {(currentUser?.isAdmin || cfs?.userId === currentUser?.id) && (
            <DeleteCfs cfs={cfs} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MoreActionsModal;
