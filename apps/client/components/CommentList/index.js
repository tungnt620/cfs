import React, { useCallback, useState } from 'react';
import { useGetCommentsQuery } from '@cfs/graphql';
import CommentItem from './CommentItem';
import { Button } from 'antd';
import { useSetLatestCommentIDUserSaw } from '@cfs/helper';

const CommentList = () => {
  const { data, fetchMore } = useGetCommentsQuery({
    variables: {
      offset: 0,
    },
  });
  const comments = data?.comments?.nodes;
  const [offset, setOffset] = useState(0);

  useSetLatestCommentIDUserSaw(offset, comments)

  const fetchAtOffset = useCallback(
    (newOffset) => {
      setOffset(newOffset);
      fetchMore({
        variables: {
          offset: newOffset,
        },
      });
      window.scrollTo(0, 0);
    },
    [fetchMore]
  );

  const handleOnNext = useCallback(() => {
    fetchAtOffset(offset + 10);
  }, [fetchAtOffset, offset]);

  const handleOnPrevious = useCallback(() => {
    fetchAtOffset(offset - 10);
  }, [fetchAtOffset, offset]);

  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      )) ?? null}

      <div className="flex justify-between bg-white mt-1 pt-3">
        <Button
          onClick={handleOnPrevious}
          disabled={offset === 0}
          type="primary"
        >
          Trước
        </Button>
        <Button onClick={handleOnNext} type="primary">
          Tiếp
        </Button>
      </div>
    </>
  );
};

export default CommentList;
