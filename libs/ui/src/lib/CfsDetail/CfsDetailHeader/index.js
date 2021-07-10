import React from 'react';
import Image from 'next/image';
import style from './style.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { useGoBack } from '@cfs/common';

const CfsDetailHeader = () => {
  const goBack = useGoBack();

  return (
    <div className={style.wrapper}>
      <Image
        src="https://confession.vn/wp-content/uploads/2018/01/neuconfessions.jpg"
        layout="fill"
        objectFit="cover"
      />

      <div className="grid grid-rows-2 grid-cols-12 h-full">
        <div />
        <div
          className={`row-start-2 col-span-12 flex w-full justify-between bg-white z-10 ${style.logoBackground}`}
        >
          <div />
          <div className="flex items-center flex-col -mt-8">
            <div className="w-16 h-16 relative">
              <Image
                className="rounded-full"
                src="https://confession.vn/wp-content/uploads/2018/01/neuconfessions.jpg"
                layout="fill"
              />
            </div>
            <div className="font-bold">c/neuconfession</div>
          </div>

          <div className="relative">
            <CloseOutlined className={style.iconX} onClick={goBack} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CfsDetailHeader;
