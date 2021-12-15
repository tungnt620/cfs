import React, { useEffect } from 'react';
import slugify from 'slugify';
import {
  registerWithoutPasswordPopupNextAction,
  setCurrentUser,
  showRegisterWithoutPasswordPopup,
} from '@cfs/helper/reactiveVars';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';
import { extractError } from '@cfs/helper/errors';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import SubPageHeader from '../../Header/SubPageHeader';
import { useReactiveVar } from '@apollo/react-hooks';
import { useCreateCategoryMutation } from '@cfs/graphql';
import ImageSelector from './ImageSelector';

const NewCommunityPage = () => {
  const router = useRouter();
  const toast = useToast();
  const currentUser = useReactiveVar(setCurrentUser);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm();

  const [
    createCommunity,
    {
      data: createCommunityData,
      error: createCommunityError,
      loading: createCommunityLoading,
    },
  ] = useCreateCategoryMutation();

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'new community',
      action: 'open',
      label: 'Open new community page',
    });
  }, []);

  const onSubmit = (values) => {
    if (values.banner_image)


    createCommunity({
      variables: values,
    });
  };

  useEffect(() => {
    if (createCommunityData) {
      toast({
        title: `Cộng đồng mới đã được tạo thành công`,
        position: 'top',
        isClosable: true,
        status: 'success',
      });
      router.push('/?tabIndex=2');
    }
  }, [createCommunityData, router, toast]);

  const onClickSendBtn = () => {
    if (!currentUser?.id) {
      showRegisterWithoutPasswordPopup(true);
      registerWithoutPasswordPopupNextAction(() => handleSubmit(onSubmit));
    } else {
      const formValues = getValues();

      console.log(formValues);

      if (!formValues.image) {
        setError('image', {
          type: 'manual',
          message: 'Ảnh đại diện không được để trống',
        })
      }
      if (!formValues.banner_image) {
        setError('banner_image', {
          type: 'manual',
          message: 'Ảnh bìa không được để trống',
        })
      }
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <SubPageHeader
        title="Tạo cộng đồng mới"
        rightActions={
          <Button
            onClick={onClickSendBtn}
            isLoading={createCommunityLoading || isSubmitting}
          >
            Gửi
          </Button>
        }
      />
      <Box mt={4}>
        {createCommunityError && (
          <Alert status="error">
            <AlertIcon />
            {extractError(createCommunityError).message}
          </Alert>
        )}

        <form>
          <FormControl isInvalid={errors.banner_image?.message} marginTop={4}>
            <FormLabel>Chọn ảnh bìa</FormLabel>
            <ImageSelector
              aspect={4 / 3}
              setCroppedImage={(croppedImage) => {
                setValue('banner_image', croppedImage);
                setError('banner_image', null);
                console.log(croppedImage);
              }}
            />
            <FormErrorMessage>
              {errors.banner_image?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.image?.message} marginTop={4}>
            <FormLabel>Chọn ảnh đại diện</FormLabel>
            <ImageSelector
              aspect={4 / 3}
              setCroppedImage={(croppedImage) => {
                setValue('image', croppedImage);
                console.log(croppedImage);
              }}
            />
            <FormErrorMessage>
              {errors.image?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.title} marginTop={4}>
            <Input
              id="title"
              placeholder="Tên của cộng đồng"
              {...register('title', {
                required: 'Hãy đặt tên cho cộng đồng nào',
              })}
              maxLength={40}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.slug} marginTop={4}>
            <Input
              id="slug"
              placeholder="mã code của cộng đồng"
              {...register('slug', {
                required: 'Hãy đặt mã code cho cộng đồng nào',
              })}
              maxLength={40}
            />
            <FormHelperText>
              Không được chứa các kí tự đặc biệt: #*+~()'"!:?
            </FormHelperText>
            <FormErrorMessage>
              {errors.slug && errors.slug.message}
            </FormErrorMessage>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default NewCommunityPage;
