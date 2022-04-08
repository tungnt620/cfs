import React, { useEffect, useState } from 'react';
import { TEMP_CREATE_CFS_FORM_DATA_LOCAL_STORAGE_KEY } from '@cfs/common/constants';
import { useCreateCfsMutation, useGetCategoriesQuery } from '@cfs/graphql';
import slugify from 'slugify';
import {
  registerWithoutPasswordPopupNextAction,
  setCurrentUser,
  setNewCfsCreatedByMe,
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
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import SelectCatModal from './SelectCatModal';
import SubPageHeader from '../../Header/SubPageHeader';
import { useReactiveVar } from '@apollo/react-hooks';
import uploadFile from '@cfs/helper/gcs/uploadFile';

const NewCfs = () => {
  const router = useRouter();
  const toast = useToast();
  const [selectedCat, setSelectedCat] = useState(null);
  const [isOpenSelectCatIdModel, setIsOpenSelectCatIdModel] = useState(false);
  const currentUser = useReactiveVar(setCurrentUser);
  const { data: getCategoriesData } = useGetCategoriesQuery({
    fetchPolicy: "network-only"
  });
  const categories = getCategoriesData?.categories?.nodes;

  const { catId } = router.query;

  useEffect(() => {
    if (catId && categories?.length > 0) {
      setSelectedCat(categories.find((c) => c.id === Number(catId)));
    }
  }, [catId, categories]);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues:
      typeof window !== 'undefined'
        ? JSON.parse(
            localStorage.getItem(TEMP_CREATE_CFS_FORM_DATA_LOCAL_STORAGE_KEY) ||
              '{}'
          )
        : {},
  });

  const [
    createCfs,
    { data: createCfsData, error: createCfsError, loading: createCfsLoading },
  ] = useCreateCfsMutation();

  const currentFormValue = watch();

  useEffect(() => {
    localStorage.setItem(
      TEMP_CREATE_CFS_FORM_DATA_LOCAL_STORAGE_KEY,
      JSON.stringify(currentFormValue || {})
    );
  }, [currentFormValue]);

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'new confession',
      action: 'open',
      label: 'Open new confession page',
    });
  }, []);

  const onSubmit = async (values) => {
    const newCfs = {
      ...values,
    };
    newCfs.catId = selectedCat?.id;

    const title = newCfs.title;
    const slug = slugify(title.substring(0, 50), {
      replacement: '-',
      remove: /[#*+~.()'"!:@?]/g,
      lower: true,
      locale: 'vi',
    });

    let image = newCfs.image || '';
    if (image) {
      image = await uploadFile(image, toast);
      if (image === 'error') return;
    }

    createCfs({
      variables: {
        ...newCfs,
        slug,
        image,
      },
    });
  };

  useEffect(() => {
    if (createCfsData) {
      toast({
        title: `Bài của bạn đã được tạo thành công`,
        position: 'top',
        isClosable: true,
        status: 'success',
      });
      localStorage.setItem(
        TEMP_CREATE_CFS_FORM_DATA_LOCAL_STORAGE_KEY,
        JSON.stringify({})
      );
      setNewCfsCreatedByMe(createCfsData.createCfs.confession);
      router.push('/?tabIndex=1');
    }
  }, [createCfsData, router, toast]);

  const onClickSendBtn = () => {
    if (!currentUser?.id) {
      showRegisterWithoutPasswordPopup(true);
      registerWithoutPasswordPopupNextAction(() => handleSubmit(onSubmit));
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <SubPageHeader
        rightActions={
          <Button
            onClick={onClickSendBtn}
            isLoading={createCfsLoading || isSubmitting}
            disabled={!selectedCat?.id}
          >
            Gửi
          </Button>
        }
      />
      <Box mt={4}>
        {createCfsError && (
          <Alert status="error">
            <AlertIcon />
            {extractError(createCfsError).message}
          </Alert>
        )}

        <form>
          <FormControl>
            <Select
              placeholder="Chọn cộng đồng"
              name="cat"
              onClick={() => setIsOpenSelectCatIdModel(true)}
              value={selectedCat ? selectedCat.id : null}
            >
              {selectedCat && (
                <option value={selectedCat.id}>{selectedCat.name}</option>
              )}
            </Select>
          </FormControl>
          <FormControl isInvalid={errors.title} marginTop={4}>
            <Textarea
              id="title"
              placeholder="Hãy đặt 1 tiêu đề thú vị"
              {...register('title', {
                required: 'Hãy đặt tiêu đề cho bài của bạn nào',
              })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.content} marginTop={4}>
            <Textarea
              id={'content'}
              placeholder="Nội dung bài của bạn"
              {...register('content', {
                required: 'Hãy viết nội dung cho bài của bạn nào',
              })}
              rows={10}
            />
            <FormErrorMessage>
              {errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.image?.message} marginTop={4}>
            <FormLabel>Thêm ảnh cho bài</FormLabel>
            <Input
              type="file"
              variant="filled"
              focusBorderColor="lime"
              placeholder="Chọn ảnh cho bài của bạn"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setValue('image', file);
                } else {
                  setValue('image', null);
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
            />
            <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
          </FormControl>
        </form>
        {isOpenSelectCatIdModel && (
          <SelectCatModal
            setSelectedCat={setSelectedCat}
            setIsOpen={setIsOpenSelectCatIdModel}
            categories={categories}
          />
        )}
      </Box>
    </>
  );
};

export default NewCfs;
