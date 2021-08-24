import React, { useMemo } from 'react';
import CfsDetailHeader from './CfsDetailHeader';
import CommentSection from '../CommentSection';
import Image from 'next/image';
import CardActions from '../CfsMiniCard/CardActions';
import dayjs from 'dayjs';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const CfsDetail = ({ cfsDetailPageData }) => {
  const userData = cfsDetailPageData.user;
  const catData = cfsDetailPageData.confessionCategories.nodes[0].category;

  const isTitleCopyFromContent = useMemo(() => {
    const content = cfsDetailPageData.content.substring(0, 200);
    return (
      content.replace(/[\r\n]+/g, '. ').includes(cfsDetailPageData.title) ||
      content.replace(/[\r\n]+/g, ' ').includes(cfsDetailPageData.title)
    );
  }, [cfsDetailPageData.content, cfsDetailPageData.title]);

  return (
    <div>
      <CfsDetailHeader cat={catData} />
      <div className="ml-1 mr-1">
        <header className="flex mt-1 pt-2 pb-2 leading-5">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-1">
              <Avatar size="small" icon={<UserOutlined />} />
              {/*<Image*/}
              {/*  className="rounded-full w-6 h-6"*/}
              {/*  src={catData.image}*/}
              {/*  width={24}*/}
              {/*  height={24}*/}
              {/*/>*/}
            </div>

            <div className="mr-4 text-sm font-medium">{userData.username}</div>

            <div>
              <span className="text-sm opacity-40 whitespace-nowrap">
                {dayjs(cfsDetailPageData.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-end">{/*<MoreActions />*/}</div>
        </header>

        <div className="font-medium text-lg">
          {!isTitleCopyFromContent && cfsDetailPageData.title}
        </div>

        <div className="relative w-full h-full mt-2">
          {cfsDetailPageData.image && (
            <Image
              src={cfsDetailPageData.image}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>

        <div className="pt-2 mb-4 whitespace-pre-line">
          {cfsDetailPageData.content}
        </div>

        <div className="mb-4">
          <CardActions cfs={cfsDetailPageData} />
        </div>
      </div>

      <CommentSection comments={cfsDetailPageData.comments.nodes} cfsId={cfsDetailPageData.id} />
    </div>
  );
};

export default CfsDetail;
