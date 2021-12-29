import React, { useEffect, useState } from 'react';
import {
  useAllCategoriesPageQuery,
  useDeleteCategoryMutation,
} from '@cfs/graphql';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import emptyImage from '@cfs/ui/images/empty.png';
import { BsPlusCircle } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper/reactiveVars';

const Communities = () => {
  const router = useRouter();
  const toast = useToast();
  const { data, refetch: refechCats } = useAllCategoriesPageQuery();
  const currentUser = useReactiveVar(setCurrentUser);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isShowDeleteConfirmation, setIsShowDeleteConfirmation] = useBoolean();

  const categories = data?.categories?.nodes ?? [];
  const [deleteCat, { loading }] = useDeleteCategoryMutation();

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'all categories',
      action: 'open',
      label: 'Open all categories page',
    });
  }, []);

  const onDelete = () => {
    try {
      deleteCat({
        variables: {
          id: deletingCategory,
        },
      }).then(() => {
        toast({
          title: `Cộng đồng đã được xoá thành công`,
          position: 'top',
          isClosable: true,
          status: 'success',
        });
        setIsShowDeleteConfirmation.off();
        refechCats();
      });
    } catch (e) {
      toast({
        title: 'Đã có lỗi khi xoá cộng đồng, bạn hãy thử lại xem',
        position: 'top',
        isClosable: true,
        status: 'error',
      });
    }
  };

  const onClickDeleteButton = (catId) => {
    setDeletingCategory(catId);
    setIsShowDeleteConfirmation.on();
  };

  return (
    <>
      <List spacing={3}>
        {categories.map((cat) => {
          return (
            <ListItem
              key={cat.id}
              display="flex"
              justifyContent="space-between"
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                cursor={'pointer'}
                onClick={() => router.push(`/c/${cat.slug}`)}
              >
                <Box w={10} h={10} position="relative">
                  <Image
                    alt={`ảnh đại diện của ${cat.name}`}
                    className="rounded-full"
                    src={cat.image || emptyImage}
                    layout="fill"
                  />
                </Box>
                <Box
                  ml={2}
                  fontSize={'1rem'}
                  fontWeight={'500'}
                >{`c/${cat.slug}`}</Box>
              </Box>
              <Box>
                {(currentUser.role === 'moderator' && currentUser.id === cat.createdBy ) || currentUser.isAdmin ? (
                  <IconButton
                    onClick={() => onClickDeleteButton(cat.id)}
                    aria-label="User"
                    colorScheme={'red'}
                    icon={<AiFillDelete />}
                    fontSize="2rem"
                  />
                ) : null}
              </Box>
            </ListItem>
          );
        })}
      </List>

      {isShowDeleteConfirmation && (
        <Modal isOpen={true} onClose={setIsShowDeleteConfirmation.off}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Xác nhận</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Bạn có chắc muốn xoá cộng đồng này?</ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={onDelete}
                isLoading={loading}
              >
                Có
              </Button>
              <Button variant="ghost" onClick={setIsShowDeleteConfirmation.off}>
                Không
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {currentUser.role === 'moderator' || currentUser.isAdmin ? (
        <Box position="fixed" right="20px" bottom="20px">
          <Link href={`/c/new/`}>
            <a>
              <IconButton
                aria-label="tạo mới cộng đồng"
                colorScheme={'teal'}
                icon={<BsPlusCircle />}
                fontSize="2rem"
              />
            </a>
          </Link>
        </Box>
      ) : null}
    </>
  );
};

export default Communities;
