import React, { useEffect, useMemo, useState } from 'react';
import CreateCommentEditor from './CreateCommentEditor';
import NestedComment from './NestedComment';
import { useReactiveVar } from '@apollo/react-hooks';
import { setNewCommentCreatedByMe } from '@cfs/helper/reactiveVars';
import { useSetLatestCommentIDUserSaw } from '@cfs/helper/hooks';
import { Box } from '@chakra-ui/react';
import { useGetCommentsByCfsLazyQuery } from '@cfs/graphql';
import { EMPTY_LIST } from '@cfs/common/constants';

const CommentSection = ({ cfsId }) => {
  const [getComments, { data }] = useGetCommentsByCfsLazyQuery({
    fetchPolicy: 'network-only',
  });

  const comments = data?.comments?.nodes || EMPTY_LIST;

  useEffect(() => {
    if (cfsId) {
      getComments({ variables: { cfsId } });
    }
  }, [cfsId, getComments]);

  const [allComments, setAllComments] = useState([]);
  const newCommentCreatedByMe = useReactiveVar(setNewCommentCreatedByMe);
  const idChildrenComments = useMemo(() => {
    const data =
      allComments?.reduce((acc, comment) => {
        if (comment?.parentId) {
          acc[comment.parentId] = [...(acc[comment.parentId] ?? []), comment];
        }
        return acc;
      }, {}) ?? {};

    // comments have parent should sort by id asc
    for (const commentId in data) {
      data[commentId] = data[commentId].sort(
        (comment1, comment2) => comment1.id - comment2.id
      );
    }

    return data;
  }, [allComments]);

  useSetLatestCommentIDUserSaw(0, comments);

  useEffect(() => {
    setAllComments(comments || []);
  }, [comments]);

  useEffect(() => {
    if (newCommentCreatedByMe && newCommentCreatedByMe.cfsId === cfsId) {
      setAllComments((prev) => [newCommentCreatedByMe, ...prev]);
    }
  }, [cfsId, newCommentCreatedByMe]);

  return (
    <div id="comments">
      <CreateCommentEditor cfsId={cfsId} />
      <Box mt={8}>
        {allComments
          ?.filter((comment) => !comment?.parentId)
          ?.map((comment) => (
            <NestedComment
              key={comment.id}
              comment={comment}
              idChildrenComments={idChildrenComments}
              cfsId={cfsId}
            />
          ))}
      </Box>
    </div>
  );
};

export default CommentSection;
