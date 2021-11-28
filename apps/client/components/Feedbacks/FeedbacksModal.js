import React from 'react';
import { showFeedbacksModal } from '@cfs/helper/reactiveVars';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Feedbacks from './index';

const FeedbacksModal = () => {
  return (
    <Modal isOpen={true} onClose={() => showFeedbacksModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Góp ý</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Feedbacks />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FeedbacksModal;
