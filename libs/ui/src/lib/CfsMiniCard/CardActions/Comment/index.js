import React from 'react';
import Link from 'next/link';
import { Box, Icon } from '@chakra-ui/react';
import { FaRegCommentAlt } from 'react-icons/fa';

const Comment = ({ url = '', numberOfComment = 0 }) => {
  return (
    <Link href={url}>
      <a>
        <Box
          display={'flex'}
          alignItems={'center'}
          h={8}
          b={1}
          border={'1px solid #efefed'}
          w={'max'}
          borderRadius={'1rem'}
          cursor={'pointer'}
        >
          <Box p={2}>
            <Icon as={FaRegCommentAlt} h={4} w={4} cursor={'pointer'} />
          </Box>
          <Box as={'span'} pr={2} fontSize={'0.75rem'} lineHeight={'1rem'}>
            {numberOfComment}
          </Box>
        </Box>
      </a>
    </Link>
  );
};

export default Comment;
