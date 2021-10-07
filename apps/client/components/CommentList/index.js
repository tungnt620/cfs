import React, { useEffect } from 'react';
import CommentItem from './CommentItem';
import { Button } from 'antd';
import { useSetLatestCommentIDUserSaw } from '@cfs/helper';
import { useGetCommentsQuery } from '@cfs/graphql';
import { usePagination } from '@cfs/helper';

const CommentList = () => {
  const { offset, goPreviousPage, goNextPage } = usePagination();

  const { data, fetchMore } = useGetCommentsQuery({
    variables: {
      offset: 0,
    },
  });
  const comments = data?.comments?.nodes;

  useSetLatestCommentIDUserSaw(offset, comments);

  useEffect(() => {
    fetchMore({
      variables: {
        offset,
      },
    });
  }, [offset, fetchMore]);

  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      )) ?? null}

      <div className="flex justify-between bg-white mt-1 pt-3">
        <Button onClick={goPreviousPage} disabled={offset === 0} type="primary">
          Trước
        </Button>
        <Button onClick={goNextPage} type="primary">
          Tiếp
        </Button>
      </div>
    </>
  );
};

export default CommentList;
