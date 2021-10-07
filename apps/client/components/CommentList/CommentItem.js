import React, { useCallback } from 'react';
import { Button, Comment, Image as AntdImage, Tag, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Image from 'next/image';
import style from './CommentItem.module.scss';
import { useBooleanToggle } from '@cfs/helper';
import { Vote } from '@cfs/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const CommentItem = ({ comment }) => {
  const router = useRouter();
  const [expandedThumbnail, toggleExpandedThumbnail] = useBooleanToggle(false);

  const catSlug =
    comment.confession.confessionCategories.nodes?.[0]?.category?.slug;
  const cfsSlug = comment.confession.slug;

  const toggleShowConfession = useCallback(() => {
    router.push(`/${cfsSlug}/`);
  }, [cfsSlug, router]);

  return (
    <Comment
      className="custom-ant-comments"
      actions={[
        <div className="block">
          <Vote
            voteNo={comment.totalReaction}
            commentId={comment.id}
            oldUserAction={comment.userCommentReaction?.nodes?.[0]?.reactType}
          />
          <Link href={`/category/${catSlug}/`}>
            <a className="font-bold text-sm">c/{catSlug}</a>
          </Link>
          <Button type="link" onClick={toggleShowConfession}>
            Xem cfs
          </Button>
        </div>,
      ]}
      author={<span>{comment.user?.username ?? comment.authorName}</span>}
      avatar={<UserOutlined className="text-lg" />}
      content={
        <>
          {expandedThumbnail ? (
            <div className="flex items-center justify-center">
              <AntdImage alt="Ảnh trong comment" src={comment.image} />
            </div>
          ) : (
            comment.image && (
              <div className={`relative w-full ${style.minHeight200px}`}>
                <Image
                  alt="Ảnh trong comment"
                  className="cursor-pointer"
                  src={comment.image}
                  layout="fill"
                  objectFit="contain"
                  onClick={toggleExpandedThumbnail}
                />
              </div>
            )
          )}

          <Link href={`/${cfsSlug}/`}>
            <a>
              <p>{comment.content}</p>
            </a>
          </Link>
        </>
      }
      datetime={
        <Tooltip title={dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{dayjs(comment.createdAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default CommentItem;
