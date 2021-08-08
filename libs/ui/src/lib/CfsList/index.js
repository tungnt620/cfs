import React from 'react';
import style from './CfsList.module.scss';
import { Button } from 'antd';
import { CfsMiniCard } from '@cfs/ui';

export const CfsList = ({ cfsList }) => {
  return (
    <div className={style.root}>
      {cfsList.map((cfs) => (
        <CfsMiniCard cfs={cfs} key={cfs.id} />
      ))}
      <div className="flex justify-end bg-white mt-1 pt-3">
        <Button type="primary">Next</Button>
      </div>
    </div>
  );
};

export default CfsList;
