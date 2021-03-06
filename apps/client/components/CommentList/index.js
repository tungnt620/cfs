import React, { useEffect } from 'react';
import CommentItem from './CommentItem';
import { useSetLatestCommentIDUserSaw } from '@cfs/helper/hooks';
import { useGetCommentsQuery } from '@cfs/graphql';
import { usePagination } from '@cfs/helper/hooks';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';
import { Box, Button } from '@chakra-ui/react';

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
    sendGAUserBehaviorEvent({
      category: 'comment list',
      action: 'open',
      label: 'Open list of comment page',
    });
  }, []);

  // Temp hack for case apollo cache 1 comment in api get latest comment
  // This happen when this page render in server
  useEffect(() => {
    if (comments?.length === 1) {
      fetchMore({
        variables: {
          offset: 0,
        },
      });
    }
  }, [comments, fetchMore]);

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

      <Box
        display={'flex'}
        justifyContent={'space-between'}
        backgroundColor={'white'}
        mt={1}
        pt={3}
      >
        <Button
          onClick={() => {
            goPreviousPage();
            sendGAUserBehaviorEvent({
              category: 'comment list pagination',
              action: 'click',
              label: 'Click previous page',
            });
          }}
          disabled={offset === 0}
        >
          Trước
        </Button>
        <Button
          onClick={() => {
            goNextPage();
            sendGAUserBehaviorEvent({
              category: 'comment list pagination',
              action: 'click',
              label: 'Click next page',
            });
          }}
        >
          Tiếp
        </Button>
      </Box>
    </>
  );
};

export default CommentList;
