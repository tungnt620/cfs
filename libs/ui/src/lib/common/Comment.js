import React from 'react';
import { Box, Icon, Text, Tooltip } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import dayjs from 'dayjs';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const Comment = ({ username, time, content, actions, mb, children }) => {
  return (
    <Box mb={mb}>
      <Box display="flex">
        <Box mt={2}>
          <Icon as={AiOutlineUser} boxSize={'20px'} />
        </Box>
        <Box display="flex" flexDirection={'column'} ml={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <Text
              fontSize={'12px'}
              color={'rgba(0,0,0,.75)'}
              transition="color .3s"
            >
              {username}
            </Text>
            <Box fontSize={'12px'} color={'#757575'} ml={4}>
              <Tooltip label={dayjs(time).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{dayjs(time).fromNow()}</span>
              </Tooltip>
            </Box>
          </Box>
          <Box mt={1}>
            <Text whiteSpace='pre-line'>{content}</Text>
            {actions && <Box mt={2}>{actions}</Box>}
          </Box>
        </Box>
      </Box>
      {children && <Box ml={6}>{children}</Box>}
    </Box>
  );
};

export default Comment;
