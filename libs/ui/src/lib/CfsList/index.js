import React from 'react';
import style from './CfsList.module.scss';
import { Button } from 'antd';
import { CfsMiniCard } from '@cfs/ui';
import { setLatestCfsIDGetByMe } from '@cfs/helper';
import { LATEST_CFS_ID_USER_SAW_LOCAL_STORAGE_KEY } from '@cfs/common';
import { useReactiveVar } from '@apollo/react-hooks';
import { usePagination } from '@cfs/helper';

export const CfsList = ({ cfsList }) => {
  const { offset, goPreviousPage, goNextPage } = usePagination();

  const currentLatestCfsIDUserSaw = useReactiveVar(setLatestCfsIDGetByMe);

  if (offset === 0 && cfsList?.length > 0) {
    const latestCfsIDUserSaw =
      cfsList[0].id > cfsList[cfsList.length - 1].id
        ? cfsList[0].id
        : cfsList[cfsList.length - 1].id;
    if (latestCfsIDUserSaw > currentLatestCfsIDUserSaw) {
      setLatestCfsIDGetByMe(latestCfsIDUserSaw);
      localStorage.setItem(
        LATEST_CFS_ID_USER_SAW_LOCAL_STORAGE_KEY,
        latestCfsIDUserSaw.toString()
      );
    }
  }

  return (
    <div className={style.root}>
      {cfsList.map((cfs) => (
        <CfsMiniCard cfs={cfs} key={cfs.id} />
      ))}
      <div className="flex justify-between bg-white mt-1 pt-3">
        <Button onClick={goPreviousPage} disabled={offset === 0} type="primary">
          Trước
        </Button>
        <Button onClick={goNextPage} type="primary">
          Tiếp
        </Button>
      </div>
    </div>
  );
};

export default CfsList;
