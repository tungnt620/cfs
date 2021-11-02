import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { BsFillPersonFill } from 'react-icons/bs';

const SubPageHeader = () => {

  return (
      <nav className="header-height select-none header-shadow">
        <div className="flex justify-between items-center h-full mx-1 sm:mx-6">
          <IconButton
            aria-label="trở về"
            variant="ghost"
            icon={<BsFillPersonFill />}
            fontSize="2rem"
          />
        </div>
      </nav>
  );
};

export default SubPageHeader;
