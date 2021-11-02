import React from 'react';
import Image from 'next/image';
import style from './style.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { useGoBack } from '@cfs/common';
import Link from 'next/link';

const CfsDetailHeader = ({ cat = {} }) => {
  const goBack = useGoBack();

  return (
    <div className={style.wrapper}>
      {cat.image && (
        <Image
          alt={`Ảnh bìa của ${cat.name}`}
          src={cat.image}
          layout="fill"
          objectFit="cover"
        />
      )}

      <div
        className={`grid grid-rows-2 grid-cols-12 h-full ${style.marginRight_1px}`}
      >
        <div />
        <div
          className={`row-start-2 col-span-12 flex w-full justify-between bg-white z-10 ${style.logoBackground}`}
        >
          <div />
          <div className="flex items-center flex-col -mt-8">
            <div className="w-16 h-16 relative">
              <Link href={`/c/${cat.slug}/`}>
                <a>
                  {cat.image && (
                    <Image
                      alt={`ảnh đại diện của ${cat.name}`}
                      className="rounded-full"
                      src={cat.image}
                      layout="fill"
                    />
                  )}
                </a>
              </Link>
            </div>
            <Link href={`/c/${cat.slug}/`}>
              <a>
                <div className="font-bold">c/{cat.slug}</div>
              </a>
            </Link>
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
