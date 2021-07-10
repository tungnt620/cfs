import React from 'react';
import Link from 'next/link';
import CommentIcon from '../../../icons/Comment';

const Comment = () => {
  return (
    <Link href="/comment">
      <a className="">
        <div className="flex items-center h-8 b-1 border border-color1 rounded-2xl w-max cursor-pointer">
          <div className="p-2">
            <CommentIcon className="color2 h-4 w-4 cursor-pointer" />
          </div>
          <span className="pr-2 text-xs color2">123</span>
        </div>
      </a>
    </Link>
  );
};

export default Comment;
