import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Image as ChakraImage } from '@chakra-ui/react';
import { useBooleanToggle } from '@cfs/helper/hooks';
import emptyImage from '../../images/empty.png';

const CardContent = ({ cfs }) => {
  const { image, slug, title } = cfs;
  const [expandedThumbnail, toggleExpandedThumbnail] = useBooleanToggle(false);

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        mt={2}
        mb={2}
        alignItems="center"
      >
        <Link href={`/${slug}/`}>
          <a>
            <Box
              w={'full'}
              display={'flex'}
              alignItems="center"
              whiteSpace={'normal'}
              fontWeight={'medium'}
              lineHeight={'1.25rem'}
            >
              {title}
            </Box>
          </a>
        </Link>

        {image && (
          <Box ml={4} h={'full'} cursor={'pointer'} minW={'40px'}>
            <Image
              alt="Hình ảnh trong bài confession"
              src={image}
              width={60}
              height={60}
              layout="intrinsic"
              onClick={toggleExpandedThumbnail}
            />
          </Box>
        )}
      </Box>

      {expandedThumbnail && (
        <Box display={'flex'} justifyContent={'center'} alignItems="center">
          <ChakraImage
            alt="Hình ảnh trong bài confession"
            src={image}
            fallbackSrc={emptyImage}
          />
        </Box>
      )}
    </>
  );
};

export default CardContent;
