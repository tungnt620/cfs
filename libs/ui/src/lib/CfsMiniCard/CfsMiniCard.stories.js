import React from 'react';
import CfsMiniCard from './CfsMiniCard';
import { boolean } from '@storybook/addon-knobs';

export default {
  component: CfsMiniCard,
  title: 'Cfs/Cfs Mini Card',
};

export const primary = () => (
  <CfsMiniCard isDisable={boolean('Disabled', false)} />
);
