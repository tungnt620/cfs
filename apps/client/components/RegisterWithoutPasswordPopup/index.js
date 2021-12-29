import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useRegisterMutation } from '@cfs/graphql';
import { useForm } from 'react-hook-form';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';
import {
  registerWithoutPasswordPopupNextAction,
  setCurrentUser,
  showLoginPopup,
  showRegisterWithoutPasswordPopup,
} from '@cfs/helper/reactiveVars';
import { extractError, getCodeFromError } from '@cfs/helper/errors';
import { useReactiveVar } from '@apollo/react-hooks';

const RegisterWithoutPasswordPopup = () => {
  const toast = useToast();
  const registerWithoutPasswordPopupNextActionValue = useReactiveVar(
    registerWithoutPasswordPopupNextAction
  );
  const [responseError, setResponseError] = useState(undefined);
  const [registerMutation] = useRegisterMutation({});

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'register_without_password_popup',
      action: 'open',
      label: 'open register without password popup',
    });
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      setResponseError(null);
      try {
        const password = Math.random().toString().slice(-8);
        const registerResp = await registerMutation({
          variables: {
            username: values.username,
            password: password,
            email: `${values.username}@confession.vn`,
          },
        });
        setCurrentUser(registerResp.data.register.user);
        toast({
          title: `Lần sau bạn có thể dùng nick name ${values.username} và mật khẩu ${password} để đăng nhập`,
          position: 'top',
          isClosable: true,
          status: 'success',
          duration: null,
        });
        showRegisterWithoutPasswordPopup(false);
        registerWithoutPasswordPopupNextActionValue?.()?.();
      } catch (e) {
        const code = getCodeFromError(e);
        if (code === 'NUNIQ') {
          setError('username', {
            type: 'manual',
            message: 'Nick name đã tồn tại',
          });
        } else {
          setResponseError(e);
        }
      }
    },
    [
      registerMutation,
      registerWithoutPasswordPopupNextActionValue,
      setError,
      toast,
    ]
  );

  const focusElement = useRef(null);
  useEffect(() => focusElement.current?.focus(), [focusElement]);

  const code = getCodeFromError(responseError);

  return (
    <Modal
      isOpen={true}
      onClose={() => showRegisterWithoutPasswordPopup(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bạn hãy chọn 1 nick name để tiếp tục</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
              <Input
                id="username"
                placeholder="Hãy nhập nick name của bạn"
                {...register('username', {
                  required: 'Nick name là bắt buộc',
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            {responseError ? (
              <Box>
                <Alert
                  type="error"
                  message="Đăng kí tài khoản thất bại"
                  description={
                    <span>
                      {extractError(responseError).message}
                      {code ? (
                        <span>
                          (Error code: <code>ERR_{code}</code>)
                        </span>
                      ) : null}
                    </span>
                  }
                />
              </Box>
            ) : null}
            <Box marginTop={4} display={'flex'} justifyContent={'space-between'}>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Gửi
              </Button>
              <Button
                onClick={() => {
                  showRegisterWithoutPasswordPopup(false);
                  showLoginPopup(true);
                }}
                variant="outline"
                marginLeft={2}
              >
                hoặc đăng nhập
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegisterWithoutPasswordPopup;
