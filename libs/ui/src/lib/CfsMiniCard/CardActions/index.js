import React, { useCallback } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Share from '../../icons/Share';
import Vote from './Vote';
import Comment from './Comment';
import { notification } from 'antd';

const CardActions = () => {
  const onCopy = useCallback(() => {
    notification.info({
      message: `Link đã được sao chép, bạn có thể dán ở bất kì đâu để chia sẻ`,
      placement: 'bottomRight',
      duration: 3,
    });
  }, []);

  return (
    <footer className="flex justify-between pb-2">
      <div className="flex">
        <Vote voteNo={82} />
        <Comment />
      </div>
      <div className="p-2 border border-color1 rounded-full">
        <CopyToClipboard text={'https://confession.vn/'} onCopy={onCopy}>
          <Share className="color2 h-4 w-4 cursor-pointer" />
        </CopyToClipboard>
      </div>
    </footer>
  );
};

export default CardActions;
