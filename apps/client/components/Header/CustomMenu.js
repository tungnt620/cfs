import React, { useCallback } from 'react';
import {
  setCurrentUser,
  showFeedbacksModal,
  showLoginPopup,
  showRegisterPopup,
} from '@cfs/helper';
import { Box, Button, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { BsFillPersonFill } from 'react-icons/bs';
import { useApolloClient, useReactiveVar } from '@apollo/react-hooks';
import { useLogoutMutation } from '@cfs/graphql';

const CustomMenu = () => {
  const client = useApolloClient();
  const openFeedbacksModal = useCallback(() => showFeedbacksModal(true), []);
  const currentUser = useReactiveVar(setCurrentUser);
  const [logout] = useLogoutMutation();

  const handleLogout = useCallback(() => {
    const reset = async () => {
      try {
        await logout();
        setCurrentUser({});
        await client.resetStore();
      } catch (e) {
        console.error(e);
      }
    };
    reset();
  }, [client, logout]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="User"
        variant="ghost"
        icon={<BsFillPersonFill />}
        fontSize="2rem"
      />
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Icon as={BsFillPersonFill} boxSize="3rem" />
            {currentUser?.id ? (
              <Box>{currentUser.username}</Box>
            ) : (
              <Box
                display="block"
                fontSize="0.9rem"
                fontWeight="400"
                fontStyle="italic"
              >
                Đăng kí tài khoản để chia sẻ những tâm sự thầm kín nhất.
                <p>Chỉ cần nick name (biệt danh) và mật khẩu.</p>
              </Box>
            )}
          </DrawerHeader>
          <DrawerBody>
            {currentUser?.id ? null : (
              <>
                <Button
                  onClick={() => {
                    showRegisterPopup(true);
                    onClose();
                  }}
                  colorScheme="teal"
                  mr={2}
                >
                  Đăng kí
                </Button>
                hoặc
                <Button
                  onClick={() => {
                    showLoginPopup(true);
                    onClose();
                  }}
                  ml={2}
                >
                  Đăng nhập
                </Button>
              </>
            )}
          </DrawerBody>
          <DrawerFooter justifyContent="flex-start">
            {currentUser?.id && (
              <>
                <Button variant="outline" mr={3} onClick={handleLogout}>
                  Đăng xuất
                </Button>
                <Button onClick={openFeedbacksModal} colorScheme="teal">
                  Gửi góp ý
                </Button>
              </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default React.memo(CustomMenu);
