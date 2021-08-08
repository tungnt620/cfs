import React from 'react';
import CardActions from './CardActions';
import CardContent from './CardContent';
import CardHeader from './CardHeader';

const CfsMiniCard = ({ cfs }) => {
  return (
    <article className="bg-white">
      <CardHeader />
      <CardContent cfs={cfs} />
      <CardActions />
    </article>
  );
};

export default CfsMiniCard;
