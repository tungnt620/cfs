import React, { useEffect, useMemo, useState } from 'react';
import CommentEditor from './CommentEditor';
import NestedComment from './NestedComment';
import { useReactiveVar } from '@apollo/react-hooks';
import { setNewCommentCreatedByMe } from '../../../../helper/src/reactiveVars';

const CommentSection = ({ comments, cfsId }) => {
  const [allComments, setAllComments] = useState([]);
  const newCommentCreatedByMe = useReactiveVar(setNewCommentCreatedByMe);
  const idChildrenComments = useMemo(() => {
    const data =
      allComments?.reduce((acc, comment) => {
        if (comment.parentId) {
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

  useEffect(() => {
    setAllComments(comments || []);
  }, [comments]);

  useEffect(() => {
    setAllComments((prev) => [newCommentCreatedByMe, ...prev]);
  }, [comments, newCommentCreatedByMe]);

  return (
    <div>
      <CommentEditor cfsId={cfsId} />
      {allComments
        ?.filter((comment) => !comment.parentId)
        ?.map((comment) => (
          <NestedComment
            comment={comment}
            idChildrenComments={idChildrenComments}
            cfsId={cfsId}
          />
        ))}
    </div>
  );
};

export default CommentSection;
