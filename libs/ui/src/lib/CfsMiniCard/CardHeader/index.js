import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FollowBtn from './FollowBtn';
import MoreActions from './MoreActions';

const CardHeader = () => {
  return (
    <header className="flex mt-1 pt-2 leading-5">
      <div className="flex items-center">
        {/*<Link href="/">*/}
        <div className="w-6 h-6 mr-1">
          <Image
            className="rounded-full w-6 h-6"
            src="https://confession.vn/wp-content/uploads/2018/01/hustconfession.jpg"
            width={24}
            height={24}
          />
        </div>
        {/*</Link>*/}

        {/*<Link href="/">*/}
        <div className="mr-2 text-sm font-medium">c/neuconfessions</div>
        {/*</Link>*/}

        <FollowBtn />

        {/*<Link href="/">*/}
        <div>
          <span className="text-sm opacity-40">12h</span>
        </div>
        {/*</Link>*/}
      </div>
      <div className="flex w-full justify-end">
        <MoreActions />
      </div>
    </header>
  );
};

export default CardHeader;
