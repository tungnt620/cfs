import React from 'react';
import CardActions from './CardActions';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import { Box } from '@chakra-ui/react';

const CfsMiniCard = ({ cfs }) => {
  return (
    <Box as={'article'} backgroundColor={'white'}>
      <CardHeader cfs={cfs} />
      <CardContent cfs={cfs} />
      <CardActions cfs={cfs} />
    </Box>
  );
};

export default CfsMiniCard;
