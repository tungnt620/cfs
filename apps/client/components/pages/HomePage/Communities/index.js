import React, { useEffect } from 'react';
import { useAllCategoriesPageQuery } from '@cfs/graphql';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';
import { useRouter } from 'next/router';
import { Box, IconButton, List, ListItem } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import emptyImage from '@cfs/ui/images/empty.png';
import { BsPlusCircle } from 'react-icons/bs';

const Communities = () => {
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
    <>
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

      <Box position="fixed" right="20px" bottom="20px">
        <Link href={`/c/new/`}>
          <a>
            <IconButton
              aria-label="User"
              variant="ghost"
              icon={<BsPlusCircle />}
              fontSize="2rem"
            />
          </a>
        </Link>
      </Box>
    </>
  );
};

export default Communities;
