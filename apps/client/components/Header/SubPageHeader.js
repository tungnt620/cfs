import React, { useCallback } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { IoIosReturnLeft } from 'react-icons/io';
import { AiOutlineHome } from 'react-icons/ai';
import { useRouter } from 'next/router';

const SubPageHeader = ({ title, rightActions }) => {
  const router = useRouter();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const goHome = useCallback(() => {
    router.push('/?tabIndex=0');
  }, [router]);

  return (
    <Box
      as={'nav'}
      userSelect={'none'}
      display={'flex'}
      justifyContent={'space-between'}
      className="header-height header-shadow"
      mx={{
        base: 1,
        sm: 6,
      }}
    >
      <Box alignItems={'center'} display={'flex'} h={'full'}>
        <IconButton
          onClick={goHome}
          aria-label="Trở về trang chủ"
          variant="ghost"
          icon={<AiOutlineHome />}
          fontSize="2rem"
        />
        <IconButton
          onClick={goBack}
          aria-label="trở về"
          variant="ghost"
          icon={<IoIosReturnLeft />}
          fontSize="2rem"
          transform={'rotateX(180deg)'}
        />
        <Box ml={2} mr={2} fontStyle={'italic'}>
          {title === undefined
            ? 'Nơi bạn chia sẻ những tâm sự thầm kín'
            : title}
        </Box>
      </Box>
      {rightActions && (
        <Box display="flex" alignItems="center">
          {rightActions}
        </Box>
      )}
    </Box>
  );
};

export default React.memo(SubPageHeader);
