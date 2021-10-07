import React, { useCallback, useState } from 'react';
import style from './CfsList.module.scss';
import { Button } from 'antd';
import { CfsMiniCard } from '@cfs/ui';
import { setLatestCfsIDGetByMe } from '@cfs/helper';
import { LATEST_CFS_ID_USER_SAW_LOCAL_STORAGE_KEY } from '@cfs/common';
import { useReactiveVar } from '@apollo/react-hooks';

export const CfsList = ({ cfsList, fetchMore, selectedCat }) => {
  const [offset, setOffset] = useState(0);
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

  const fetchAtOffset = useCallback(
    (newOffset) => {
      setOffset(newOffset);
      fetchMore({
        variables: {
          offset: newOffset,
          catId: isNaN(selectedCat) ? undefined : parseInt(selectedCat),
        },
      });
      window.scrollTo(0, 0);
    },
    [fetchMore, selectedCat]
  );

  const handleOnNext = useCallback(() => {
    fetchAtOffset(offset + 10);
  }, [fetchAtOffset, offset]);

  const handleOnPrevious = useCallback(() => {
    fetchAtOffset(offset - 10);
  }, [fetchAtOffset, offset]);

  return (
    <div className={style.root}>
      {cfsList.map((cfs) => (
        <CfsMiniCard cfs={cfs} key={cfs.id} />
      ))}
      <div className="flex justify-between bg-white mt-1 pt-3">
        <Button
          onClick={handleOnPrevious}
          disabled={offset === 0}
          type="primary"
        >
          Trước
        </Button>
        <Button onClick={handleOnNext} type="primary">
          Tiếp
        </Button>
      </div>
    </div>
  );
};

export default CfsList;
