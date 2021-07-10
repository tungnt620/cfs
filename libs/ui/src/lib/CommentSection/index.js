import React from 'react';
import CommentEditor from './CommentEditor';
import NestedComment from './NestedComment';

const CommentSection = () => {
  return (
    <div>
      <CommentEditor />
      <NestedComment>
        <NestedComment>
          <NestedComment />
          <NestedComment />
        </NestedComment>
      </NestedComment>
    </div>
  );
};

export default CommentSection;
