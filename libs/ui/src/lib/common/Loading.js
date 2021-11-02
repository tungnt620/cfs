import React from 'react';
import { Box, CircularProgress } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress isIndeterminate color="green.300" />
    </Box>
  );
};

export default Loading;
