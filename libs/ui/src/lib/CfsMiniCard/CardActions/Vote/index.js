import React, { useCallback, useEffect, useState } from 'react';
import UpVote from '../../../icons/UpVote';
import {
  ReactionType,
  useCreateOrUpdateConfessionReactionMutation,
} from '@cfs/graphql';
import { useReactiveVar } from '@apollo/react-hooks';
import {
  setCurrentUser,
  showLoginPopup,
} from '../../../../../../helper/src/reactiveVars';

const Vote = ({ voteNo = 0, confessionId, commentId, oldUserAction }) => {
  const [action, setAction] = useState(oldUserAction);
  const [localVoteNo, setLocalVoteNo] = useState(voteNo);
  const currentUser = useReactiveVar(setCurrentUser);

  useEffect(() => {
    if (!currentUser?.id) {
      setAction(ReactionType.None);
      setLocalVoteNo(voteNo);
    }
  }, [currentUser?.id, voteNo]);

  useEffect(() => {
    setLocalVoteNo(voteNo);
  }, [voteNo]);

  useEffect(() => {
    if (oldUserAction) {
      setAction(oldUserAction);
    }
  }, [oldUserAction]);

  const [reactConfession] = useCreateOrUpdateConfessionReactionMutation();

  const updateAction = useCallback(
    (newAction) => {
      switch (newAction) {
        case ReactionType.Up:
          if (action === ReactionType.Down) {
            setLocalVoteNo((prev) => prev + 2);
          } else if (action === ReactionType.None) {
            setLocalVoteNo((prev) => prev + 1);
          }
          break;
        case ReactionType.Down:
          if (action === ReactionType.Up) {
            setLocalVoteNo((prev) => prev - 2);
          } else if (action === ReactionType.None) {
            setLocalVoteNo((prev) => prev - 1);
          }
          break;
        case ReactionType.None:
          if (action === ReactionType.Up) {
            setLocalVoteNo((prev) => prev - 1);
          } else if (action === ReactionType.Down) {
            setLocalVoteNo((prev) => prev + 1);
          }
          break;
      }
    },
    [action]
  );

  const upVote = useCallback(() => {
    if (currentUser?.id) {
      const newAction =
        action === ReactionType.Up ? ReactionType.None : ReactionType.Up;
      updateAction(newAction);
      setAction(newAction);
      if (confessionId) {
        reactConfession({
          variables: {
            confessionId,
            reactType: newAction,
          },
        });
      }
    } else {
      showLoginPopup(true);
    }
  }, [action, confessionId, currentUser?.id, reactConfession, updateAction]);

  const downVote = useCallback(() => {
    if (currentUser?.id) {
      const newAction =
        action === ReactionType.Down ? ReactionType.None : ReactionType.Down;
      updateAction(newAction);
      setAction(newAction);
      if (confessionId) {
        reactConfession({
          variables: {
            confessionId,
            reactType: newAction,
          },
        });
      }
    } else {
      showLoginPopup(true);
    }
  }, [action, confessionId, currentUser?.id, reactConfession, updateAction]);

  return (
    <div className="flex items-center h-8 b-1 border border-color1 rounded-2xl w-max mr-3">
      <div className="p-2" onClick={upVote}>
        <UpVote
          className={`color2 h-4 w-4 cursor-pointer ${
            action === ReactionType.Up ? 'color3' : ''
          }`}
        />
      </div>
      <span className="text-xs color2">{localVoteNo}</span>
      <div className="p-2" onClick={downVote}>
        <UpVote
          className={`transform rotate-180 color2 h-4 w-4 cursor-pointer ${
            action === ReactionType.Down ? 'color3' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default Vote;
