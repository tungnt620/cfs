import React from 'react';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper/reactiveVars';
import Comment from '@cfs/ui/common/Comment';

const Feedback = ({ feedback }) => {
  const currentUser = useReactiveVar(setCurrentUser);

  return (
    <Comment
      content={feedback.content}
      username={currentUser?.username}
      time={feedback.createdAt}
      mb={6}
    />
  );
};

export default Feedback;
