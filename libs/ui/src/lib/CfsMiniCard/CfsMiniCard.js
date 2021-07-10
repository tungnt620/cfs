import React from 'react';
import CardActions from './CardActions';
import CardContent from './CardContent';
import CardHeader from './CardHeader';

const CfsMiniCard = () => {
  return (
    <article className="bg-white">
      <CardHeader />
      <CardContent />
      <CardActions />
    </article>
  );
};

export default CfsMiniCard;
