import React, { useMemo } from 'react';
import CfsDetailHeader from './CfsDetailHeader';
import CommentSection from '../CommentSection';
import Image from 'next/image';
import CardActions from '../CfsMiniCard/CardActions';
import dayjs from 'dayjs';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image as AntdImage } from 'antd';
import style from './CfsDetail.module.scss';
import { useBooleanToggle } from '@cfs/helper';
import { findNumberOccurrenceInString } from '../../../../helper/src/string';
import { CfsMiniCard } from '@cfs/ui';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const CfsDetail = ({ cfsDetailPageData, relativeCfsData }) => {
  const [expandedThumbnail, toggleExpandedThumbnail] = useBooleanToggle(false);
  const userData = cfsDetailPageData.user;
  const catData = cfsDetailPageData.confessionCategories.nodes[0]?.category;

  const isTitleCopyFromContent = useMemo(() => {
    const content = cfsDetailPageData.content.substring(0, 200);
    return (
      content.replace(/[\r\n]+/g, '. ').includes(cfsDetailPageData.title) ||
      content.replace(/[\r\n]+/g, ' ').includes(cfsDetailPageData.title)
    );
  }, [cfsDetailPageData.content, cfsDetailPageData.title]);

  const isContainSelfLink = useMemo(() => {
    const numberOfLink = findNumberOccurrenceInString(
      cfsDetailPageData.content,
      '<a href='
    );
    const numberOfSelfLink = findNumberOccurrenceInString(
      cfsDetailPageData.content,
      '<a href="https://confession.vn'
    );
    return numberOfSelfLink === numberOfLink;
  }, [cfsDetailPageData.content]);

  return (
    <main>
      <CfsDetailHeader cat={catData} />
      <div className="ml-1 mr-1">
        <header className="flex mt-1 pt-2 pb-2 leading-5">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-1">
              <Avatar size="small" icon={<UserOutlined />} />
            </div>

            <div className="mr-4 text-sm font-medium">{userData.username}</div>

            <div>
              <span className="text-sm whitespace-nowrap color-4">
                {dayjs(cfsDetailPageData.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-end">{/*<MoreActions />*/}</div>
        </header>

        <div className="font-medium text-lg">
          {!isTitleCopyFromContent && cfsDetailPageData.title}
        </div>

        {expandedThumbnail ? (
          <div className="flex items-center justify-center">
            <AntdImage
              alt="Hình mô tả cho bài confession"
              src={cfsDetailPageData.image}
            />
          </div>
        ) : (
          cfsDetailPageData.image && (
            <div className={`relative w-full mt-2 ${style.minHeight300px}`}>
              <Image
                alt="Hình mô tả cho bài confession"
                src={cfsDetailPageData.image}
                layout="fill"
                objectFit="contain"
                onClick={toggleExpandedThumbnail}
              />
            </div>
          )
        )}

        {isContainSelfLink ? (
          <div
            className={`pt-2 mb-4 whitespace-pre-line ${style.highlightLink}`}
            dangerouslySetInnerHTML={{ __html: cfsDetailPageData.content }}
          />
        ) : (
          <div className="pt-2 mb-4 whitespace-pre-line">
            {cfsDetailPageData.content}
          </div>
        )}

        <div className="mb-4">
          <CardActions cfs={cfsDetailPageData} />
        </div>
      </div>

      <CommentSection
        comments={cfsDetailPageData.comments.nodes}
        cfsId={cfsDetailPageData.id}
      />

      {relativeCfsData && (
        <div className="mt-8 ml-2 mr-2">
          <h3 className="font-bold text-base">
            Confession khác có thể bạn thích
          </h3>
          {relativeCfsData.map((cfs) => (
            <CfsMiniCard cfs={cfs} key={cfs.id} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CfsDetail;
