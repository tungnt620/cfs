import React, { useCallback, useEffect } from 'react';
import slugify from 'slugify';
import {
  registerWithoutPasswordPopupNextAction,
  setCurrentUser,
  showRegisterWithoutPasswordPopup,
} from '@cfs/helper/reactiveVars';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';
import { extractError, getCodeFromError } from '@cfs/helper/errors';
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
import uploadFile from '@cfs/helper/gcs/uploadFile';

const communityIgnoredCharacters = `#*+~()'"!:?`;
const communityIgnoredCharactersRegex = /[#*+~()'"!:?]/g;

const NewCommunityPage = () => {
  const router = useRouter();
  const toast = useToast();
  const currentUser = useReactiveVar(setCurrentUser);
  const [responseError, setResponseError] = React.useState(null);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const nameValue = watch('name', '');
  const slugValue = watch('slug', '');

  const normalizeSlug = useCallback(
    (slug) => {
      if (slug) {
        slug = slugify(slug.substring(0, 50), {
          replacement: '',
          remove: communityIgnoredCharactersRegex,
          lower: false,
          locale: 'vi',
        });
      }

      setValue('slug', slug);
    },
    [setValue]
  );

  useEffect(() => {
    normalizeSlug(nameValue);
  }, [normalizeSlug, nameValue]);

  useEffect(() => {
    normalizeSlug(slugValue);
  }, [normalizeSlug, slugValue]);

  const [
    createCommunity,
    { loading: createCommunityLoading },
  ] = useCreateCategoryMutation();

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'new community',
      action: 'open',
      label: 'Open new community page',
    });
  }, []);

  const onSubmit = async (values) => {
    let bannerImageUrl = '',
      profileImageUrl = '';
    const { image: bannerImage } = values.banner_image || {};
    if (bannerImage) {
      bannerImageUrl = await uploadFile(bannerImage, toast);
    }
    const { image: profileImage } = values.image || {};
    if (profileImage) {
      profileImageUrl = await uploadFile(profileImage, toast);
    }

    if (bannerImageUrl && profileImageUrl) {
      try {
        await createCommunity({
          variables: {
            name: values.name,
            slug: values.slug,
            image: profileImageUrl,
            bannerImage: bannerImageUrl,
          },
        });
        toast({
          title: `Cộng đồng mới đã được tạo thành công`,
          position: 'top',
          isClosable: true,
          status: 'success',
        });
        if (slugValue) {
          router.push(`/c/${slugValue}`);
        }
      } catch (e) {
        const code = getCodeFromError(e);
        if (code === 'NUNIQ') {
          setError('slug', {
            type: 'manual',
            message: 'Tên cộng đồng đã tồn tại',
          });
        } else {
          setResponseError(e);
        }
      }
    }
  };

  const onClickSendBtn = () => {
    if (!currentUser?.id) {
      showRegisterWithoutPasswordPopup(true);
      registerWithoutPasswordPopupNextAction(() => handleSubmit(onSubmit));
    } else {
      const formValues = getValues();

      if (!formValues.image?.image) {
        setError('image', {
          type: 'manual',
          message: 'Ảnh đại diện không được để trống',
        });
      }
      if (!formValues.banner_image?.image) {
        setError('banner_image', {
          type: 'manual',
          message: 'Ảnh bìa không được để trống',
        });
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
        {responseError && (
          <Alert status="error">
            <AlertIcon />
            {extractError(responseError).message}
          </Alert>
        )}

        <form>
          <FormControl isInvalid={errors.name} marginTop={4}>
            <Input
              id="name"
              placeholder="Tên của cộng đồng"
              {...register('name', {
                required: 'Hãy đặt tên cho cộng đồng nào',
              })}
              maxLength={40}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.slug} marginTop={4}>
            <Input
              id="slug"
              placeholder="Nick name của cộng đồng"
              {...register('slug', {
                required: 'Hãy đặt nick name cho cộng đồng nào',
              })}
              maxLength={40}
            />
            <FormHelperText>
              Không được chứa các kí tự đặc biệt: {communityIgnoredCharacters}
            </FormHelperText>
            <FormErrorMessage>
              {errors.slug && errors.slug.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.banner_image?.message} marginTop={4}>
            <FormLabel>Chọn ảnh bìa</FormLabel>
            <ImageSelector
              aspect={4 / 3}
              setCroppedImage={(croppedImage) => {
                setValue('banner_image', croppedImage);
                clearErrors('banner_image');
              }}
            />
            <FormErrorMessage>{errors.banner_image?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.image?.message} marginTop={4}>
            <FormLabel>Chọn ảnh đại diện</FormLabel>
            <ImageSelector
              aspect={4 / 3}
              setCroppedImage={(croppedImage) => {
                setValue('image', croppedImage);
                clearErrors('image');
              }}
            />
            <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default NewCommunityPage;
