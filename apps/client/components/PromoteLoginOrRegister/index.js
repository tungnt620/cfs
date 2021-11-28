import React from 'react';
import {
  showLoginPopup,
  showRegisterPopup,
  showPromoteLoginOrRegisterPopup,
} from '@cfs/helper/reactiveVars';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const PromoteLoginOrRegister = () => {
  return (
    <Modal isOpen={true} onClose={() => showPromoteLoginOrRegisterPopup(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bạn cần đăng nhập</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={8}>
            Đăng kí tài khoản để chia sẻ những tâm sự thầm kín nhất.
            <p>Chỉ cần nick name (biệt danh) và mật khẩu (chỉ 30s)</p>
          </Box>

          <Box>
            <Button
              onClick={() => {
                showLoginPopup(true);
                showPromoteLoginOrRegisterPopup(false);
              }}
              mr={2}
              colorScheme="teal"
            >
              Đăng nhập
            </Button>
            hoặc
            <Button
              onClick={() => {
                showRegisterPopup(true);
                showPromoteLoginOrRegisterPopup(false);
              }}
              ml={2}
            >
              Đăng kí
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PromoteLoginOrRegister;
