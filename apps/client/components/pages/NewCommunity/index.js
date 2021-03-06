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
      if (bannerImageUrl === 'error') return;
    }
    const { image: profileImage } = values.image || {};
    if (profileImage) {
      profileImageUrl = await uploadFile(profileImage, toast);
      if (profileImageUrl === 'error') return;
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
          title: `C???ng ?????ng m???i ???? ???????c t???o th??nh c??ng`,
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
            message: 'T??n c???ng ?????ng ???? t???n t???i',
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
          message: '???nh ?????i di???n kh??ng ???????c ????? tr???ng',
        });
      }
      if (!formValues.banner_image?.image) {
        setError('banner_image', {
          type: 'manual',
          message: '???nh b??a kh??ng ???????c ????? tr???ng',
        });
      }

      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <SubPageHeader
        title="T???o c???ng ?????ng m???i"
        rightActions={
          <Button
            onClick={onClickSendBtn}
            isLoading={createCommunityLoading || isSubmitting}
          >
            G???i
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
              placeholder="T??n c???a c???ng ?????ng"
              {...register('name', {
                required: 'H??y ?????t t??n cho c???ng ?????ng n??o',
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
              placeholder="Nick name c???a c???ng ?????ng"
              {...register('slug', {
                required: 'H??y ?????t nick name cho c???ng ?????ng n??o',
              })}
              maxLength={40}
            />
            <FormHelperText>
              Kh??ng ???????c ch???a c??c k?? t??? ?????c bi???t: {communityIgnoredCharacters}
            </FormHelperText>
            <FormErrorMessage>
              {errors.slug && errors.slug.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.banner_image?.message} marginTop={4}>
            <FormLabel>Ch???n ???nh b??a</FormLabel>
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
            <FormLabel>Ch???n ???nh ?????i di???n</FormLabel>
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
