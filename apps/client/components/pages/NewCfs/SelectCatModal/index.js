import React, { useMemo } from 'react';
import {
  Box,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useGetCategoriesQuery } from '@cfs/graphql';
import { useReactiveVar } from '@apollo/react-hooks';
import { setRecentCatIdsViewedByMe } from '@cfs/helper/reactiveVars';
import Image from 'next/image';
import emptyImage from '@cfs/ui/images/empty.png';

const SelectCatModal = ({ setSelectedCat, setIsOpen }) => {
  const recentCatIds = useReactiveVar(setRecentCatIdsViewedByMe);

  const { data: getCategoriesData } = useGetCategoriesQuery();
  const categories = getCategoriesData?.categories?.nodes;
  const catIdDataMap = useMemo(
    () =>
      categories?.reduce((acc, cat) => {
        acc[cat.id] = cat;
        return acc;
      }, {}) || [],
    [categories]
  );

  const recentViewedCats = [...recentCatIds]
    .reverse()
    .map((catId) => catIdDataMap[catId])
    .filter((cat) => !!cat);

  const recentViewedCatIDSet = new Set(recentCatIds);
  const otherCats =
    categories?.filter((cat) => !recentViewedCatIDSet.has(cat.id)) || [];

  function renderCats(cats) {
    return cats.map((cat) => {
      return (
        <ListItem
          key={cat.id}
          onClick={() => {
            setSelectedCat(cat);
            setIsOpen(false);
          }}
          display={'flex'}
          alignItems={'center'}
          cursor={'pointer'}
        >
          <Box w={8} h={8} position="relative">
            <Image
              alt={`ảnh đại diện của ${cat.name}`}
              className="rounded-full"
              src={cat.image || emptyImage}
              layout="fill"
            />
          </Box>
          <Box ml={2} fontSize={'1rem'} fontWeight={'500'}>
            {cat.name}
          </Box>
        </ListItem>
      );
    });
  }

  return (
    <Modal isOpen={true} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chọn một cộng đồng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={'1.2rem'} fontWeight={300} marginBottom={2}>
            Xem gần đây
          </Text>
          <List spacing={3} marginBottom={8}>
            {renderCats(recentViewedCats)}
          </List>

          <Text fontSize={'1.2rem'} fontWeight={300} marginBottom={2}>
            Cộng đồng khác
          </Text>
          <List spacing={3}>{renderCats(otherCats)}</List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SelectCatModal;
