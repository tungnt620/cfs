import React from 'react';
import Image from 'next/image';
import style from './style.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useGoBack } from '@cfs/common/urls';
import Link from 'next/link';
import { Box, Icon } from '@chakra-ui/react';

const CfsDetailHeader = ({ cat = {} }) => {
  const goBack = useGoBack();

  const bannerImage = cat.bannerImage || cat.image;

  return (
    <Box position={'relative'} h={'110px'} w={'100%'}>
      {bannerImage && (
        <Image
          alt={`Ảnh bìa của ${cat.name}`}
          src={bannerImage}
          layout="fill"
          objectFit="cover"
        />
      )}

      <Box
        display="grid"
        gridTemplateRows={'repeat(2,minmax(0,1fr))'}
        gridTemplateColumns={'repeat(12,minmax(0,1fr))'}
        h={'full'}
        mr={'-1px'}
      >
        <div />
        <Box
          display="flex"
          gridRowStart={2}
          gridColumn={'span 12/span 12'}
          w={'full'}
          justifyContent={'space-between'}
          backgroundColor={'white'}
          zIndex={10}
          className={style.logoBackground}
        >
          <div />
          <Box
            display="flex"
            alignItems={'center'}
            flexDirection="column"
            mt={'-2rem'}
          >
            <Box w={16} h={16} position={'relative'}>
              <Link href={`/c/${cat.slug}/`}>
                <a>
                  {cat.image && (
                    <Image
                      alt={`ảnh đại diện của ${cat.name}`}
                      className="rounded-full"
                      src={cat.image}
                      layout="fill"
                    />
                  )}
                </a>
              </Link>
            </Box>
            <Link href={`/c/${cat.slug}/`}>
              <a>
                <Box fontWeight={'bold'}>c/{cat.slug}</Box>
              </a>
            </Link>
          </Box>

          <Box position="relative">
            <Icon
              className={style.iconX}
              boxSize={'1.8rem'}
              as={AiOutlineClose}
              onClick={goBack}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CfsDetailHeader;
