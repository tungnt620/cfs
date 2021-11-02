import React, { useCallback, useEffect, useRef, useState } from 'react';
import { extractError, getCodeFromError } from '@cfs/helper';
import { useRegisterMutation } from '@cfs/graphql';
import {
  setCurrentUser,
  showLoginPopup,
  showRegisterPopup,
  sendGAUserBehaviorEvent,
} from '@cfs/helper';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const RegisterPopup = () => {
  const toast = useToast();
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
      category: 'register',
      action: 'open',
      label: 'open register popup',
    });
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      setResponseError(null);
      try {
        const registerResp = await registerMutation({
          variables: {
            username: values.username,
            password: values.password,
            email: `${values.username}@confession.vn`,
          },
        });
        setCurrentUser(registerResp.data.register.user);
        toast({
          title: `Đăng kí tài khoản thành công`,
          position: 'top',
          isClosable: true,
          status: 'success',
        });
        showRegisterPopup(false);
      } catch (e) {
        const code = getCodeFromError(e);
        if (code === 'NUNIQ') {
          setError('username', {
            type: 'manual',
            message: 'Tên đăng nhập đã tồn tại',
          });
        } else if (code === 'WEAKP') {
          setError('password', {
            type: 'manual',
            message: 'Mật khẩu phải có ít nhất 8 kí tự',
          });
        } else {
          setResponseError(e);
        }
      }
    },
    [registerMutation, setError, toast]
  );

  const focusElement = useRef(null);
  useEffect(() => focusElement.current?.focus(), [focusElement]);

  const code = getCodeFromError(responseError);

  return (
    <Modal isOpen={true} onClose={() => showRegisterPopup(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Đăng kí tài khoản</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Nick name (biệt danh)</FormLabel>
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
            <FormControl isInvalid={errors.password} marginTop={4}>
              <FormLabel htmlFor="password">Mật khẩu</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Hãy nhập mật khẩu"
                {...register('password', {
                  required: 'Mật khẩu là bắt buộc',
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
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
            <Box marginTop={4}>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Đăng kí
              </Button>
              <Button
                onClick={() => {
                  showRegisterPopup(false);
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

export default RegisterPopup;
