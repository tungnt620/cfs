import React, { useCallback, useState } from 'react';
import style from './CfsList.module.scss';
import { Button } from 'antd';
import { CfsMiniCard } from '@cfs/ui';

export const CfsList = ({ cfsList, fetchMore }) => {
  const [offset, setOffset] = useState(0);

  const fetchAtOffset = useCallback(
    (newOffset) => {
      setOffset(newOffset);
      fetchMore({
        variables: {
          offset: newOffset,
        },
      });
    },
    [fetchMore]
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
