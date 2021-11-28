import React, { useCallback, useEffect, useRef, useState } from 'react';
import { extractError, getCodeFromError } from '@cfs/helper/errors';
import { useLoginMutation } from '@cfs/graphql';
import {
  setCurrentUser,
  showLoginPopup,
  showRegisterPopup,
} from '@cfs/helper/reactiveVars';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';
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

const LoginPopup = () => {
  const toast = useToast();
  const [responseError, setResponseError] = useState(undefined);
  const [login] = useLoginMutation({});
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'login',
      action: 'open',
      label: 'open login popup',
    });
  }, []);

  const onSubmit = useCallback(
    async (values) => {
      setResponseError(null);
      try {
        const loginResp = await login({
          variables: {
            username: values.username,
            password: values.password,
          },
        });
        setCurrentUser(loginResp.data.login.user);
        toast({
          title: `Đăng nhập thành công`,
          position: 'top',
          isClosable: true,
          status: 'success',
        });
        showLoginPopup(false);
      } catch (e) {
        const code = getCodeFromError(e);
        if (code === 'CREDS') {
          setError('password', {
            type: 'manual',
            message: 'Tên đăng nhập hoặc mật khẩu không đúng',
          });
        } else {
          setResponseError(e);
        }
      }
    },
    [login, setError, toast]
  );

  const focusElement = useRef(null);
  useEffect(() => void (focusElement.current && focusElement.current.focus()), [
    focusElement,
  ]);

  const code = getCodeFromError(responseError);

  return (
    <Modal isOpen={true} onClose={() => showLoginPopup(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Đăng nhập</ModalHeader>
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
                  message={`Đăng nhập thất bại`}
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
                Đăng nhập
              </Button>
              <Button
                onClick={() => {
                  showRegisterPopup(true);
                  showLoginPopup(false);
                }}
                variant="outline"
                marginLeft={2}
              >
                hoặc đăng ký
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginPopup;
