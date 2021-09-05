import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import emptyImage from '../../images/empty.png';
import dayjs from 'dayjs';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const CardHeader = ({ cfs }) => {
  const catData = cfs?.confessionCategories?.nodes?.[0]?.category ?? {};

  return (
    <header className="flex mt-1 pt-2 leading-5">
      <div className="flex items-center">
        <Link href={`/category/${catData.slug}`}>
          <a>
            <div className="w-6 h-6 mr-1">
              <Image
                alt={`Ảnh đại diện của ${catData.name}`}
                className="rounded-full w-6 h-6"
                src={catData.image ?? emptyImage}
                width={24}
                height={24}
              />
            </div>
          </a>
        </Link>

        <Link href={`/category/${catData.slug}`}>
          <a>
            <div className="mr-2 text-sm font-medium whitespace-nowrap">
              c/{catData.slug}
            </div>
          </a>
        </Link>

        {/*<FollowBtn />*/}

        <Link href={`/${cfs?.slug}`}>
          <a>
            <div>
              <span className="text-sm whitespace-nowrap color4">
                {dayjs(cfs?.createdAt).fromNow()}
              </span>
            </div>
          </a>
        </Link>
      </div>
      <div className="flex w-full justify-end">{/*<MoreActions />*/}</div>
    </header>
  );
};

export default CardHeader;
