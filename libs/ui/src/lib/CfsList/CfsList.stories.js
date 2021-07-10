import React from 'react';
import CfsList from './index';

export default {
  component: CfsList,
  title: 'Cfs/CfsList',
};

export const primary = () => <CfsList cfsList={Array(10).fill(1)} />;
