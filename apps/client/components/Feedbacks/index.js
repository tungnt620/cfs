import React, { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/react-hooks';
import CreateFeedback from './CreatFeedback';
import Feedback from './Feedback';
import { useAllOwnFeedbackLazyQuery } from '@cfs/graphql';
import {
  setCurrentUser,
  setNewFeedbackCreatedByMe,
} from '@cfs/helper/reactiveVars';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';

const Feedbacks = () => {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const newFeedbackCreatedByMe = useReactiveVar(setNewFeedbackCreatedByMe);
  const currentUser = useReactiveVar(setCurrentUser);

  const [getFeedbacks, { data, refetch }] = useAllOwnFeedbackLazyQuery();
  const feedbacks = data?.feedbacks?.nodes;

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'feedback',
      action: 'open',
      label: 'Open feedback dialog',
    });
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      getFeedbacks();
    }
  }, [currentUser, getFeedbacks]);

  useEffect(() => {
    setAllFeedbacks(feedbacks || []);
  }, [feedbacks]);

  useEffect(() => {
    if (newFeedbackCreatedByMe) {
      refetch?.();
    }
  }, [refetch, newFeedbackCreatedByMe]);

  return (
    <div id="feedbacks">
      <CreateFeedback />
      {allFeedbacks
        ?.filter((feedback) => !feedback?.parentId)
        ?.map((feedback) => (
          <Feedback key={feedback.id} feedback={feedback} />
        ))}
    </div>
  );
};

export default Feedbacks;
