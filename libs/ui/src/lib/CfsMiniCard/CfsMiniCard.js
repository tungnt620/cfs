import React from 'react';
import CardActions from './CardActions';
import CardContent from './CardContent';
import CardHeader from './CardHeader';

const CfsMiniCard = ({ cfs }) => {
  return (
    <article className="bg-white">
      <CardHeader cfs={cfs} />
      <CardContent cfs={cfs} />
      <CardActions cfs={cfs} />
    </article>
  );
};

export default CfsMiniCard;
