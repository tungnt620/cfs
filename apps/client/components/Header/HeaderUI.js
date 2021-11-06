import React from 'react';
import { Box } from '@chakra-ui/react';
import CreateNewCfs from './CreateNewCfs';
import CustomMenu from './CustomMenu';

const HeaderUI = () => {
  return (
    <Box as={'nav'} userSelect={'none'} className="header-height header-shadow">
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems="center"
        h={'full'}
        mx={{
          base: 1,
          sm: 6,
        }}
      >
        <CustomMenu />
        <Box ml={4} mr={4} fontStyle="italic">
          Nơi bạn chia sẻ những tâm sự thầm kín
        </Box>
        <Box display="flex">
          <CreateNewCfs />
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderUI;
