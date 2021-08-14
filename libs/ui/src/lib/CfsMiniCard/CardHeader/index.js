import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FollowBtn from './FollowBtn';
import MoreActions from './MoreActions';
import emptyImage from '../../images/empty.png';
import dayjs from 'dayjs';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const CardHeader = ({ cfs }) => {
  return (
    <header className="flex mt-1 pt-2 leading-5">
      <div className="flex items-center">
        {/*<Link href="/">*/}
        <div className="w-6 h-6 mr-1">
          <Image
            className="rounded-full w-6 h-6"
            src={
              cfs?.confessionCategories?.nodes?.[0]?.category.image ??
              emptyImage
            }
            width={24}
            height={24}
          />
        </div>
        {/*</Link>*/}

        {/*<Link href="/">*/}
        <div className="mr-2 text-sm font-medium">
          c/{cfs?.confessionCategories?.nodes?.[0]?.category.slug}
        </div>
        {/*</Link>*/}

        {/*<FollowBtn />*/}

        {/*<Link href="/">*/}
        <div>
          <span className="text-sm opacity-40">
            {dayjs(cfs?.createdAt).fromNow()}
          </span>
        </div>
        {/*</Link>*/}
      </div>
      <div className="flex w-full justify-end">
        {/*<MoreActions />*/}
      </div>
    </header>
  );
};

export default CardHeader;
