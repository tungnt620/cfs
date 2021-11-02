import React, { useEffect } from 'react';
import { useAllCategoriesPageQuery } from '@cfs/graphql';
import { sendGAUserBehaviorEvent } from '@cfs/helper';
import { useRouter } from 'next/router';
import { Box, List, ListItem } from '@chakra-ui/react';
import Image from 'next/image';
import { emptyImage } from '@cfs/ui';

const Categories = () => {
  const router = useRouter();
  const { data } = useAllCategoriesPageQuery();

  const categories = data?.categories?.nodes ?? [];

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'all categories',
      action: 'open',
      label: 'Open all categories page',
    });
  }, []);

  return (
    <List spacing={3}>
      {categories.map((cat) => {
        return (
          <ListItem
            key={cat.id}
            onClick={() => router.push(`/c/${cat.slug}`)}
            display={'flex'}
            alignItems={'center'}
            cursor={'pointer'}
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
          </ListItem>
        );
      })}
    </List>
  );
};

export default Categories;
