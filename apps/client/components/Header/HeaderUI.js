import React from 'react';
import { Box } from '@chakra-ui/react';
import CreateNewCfs from './CreateNewCfs';
import CustomMenu from './CustomMenu';

const HeaderUI = () => {
  return (
    <nav className="header-height select-none header-shadow">
      <div className="flex justify-between items-center h-full mx-1 sm:mx-6">
        <CustomMenu />
        <Box ml={4} mr={4} fontStyle="italic">
          Nơi bạn chia sẻ những tâm sự thầm kín
        </Box>
        <Box display="flex">
          <CreateNewCfs />
        </Box>
      </div>
    </nav>
  );
};

export default HeaderUI;
