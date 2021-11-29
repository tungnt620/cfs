import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactionType,
  useCreateOrUpdateCommentReactionMutation,
  useCreateOrUpdateConfessionReactionMutation,
} from '@cfs/graphql';
import { useReactiveVar } from '@apollo/react-hooks';
import {
  setCurrentUser,
  showPromoteLoginOrRegisterPopup,
} from '@cfs/helper/reactiveVars';
import { Box, Icon } from '@chakra-ui/react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';

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
  const [reactComment] = useCreateOrUpdateCommentReactionMutation();

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
      } else if (commentId) {
        reactComment({
          variables: {
            commentId,
            reactType: newAction,
          },
        });
      }
    } else {
      showPromoteLoginOrRegisterPopup(true);
    }
  }, [
    action,
    commentId,
    confessionId,
    currentUser?.id,
    reactComment,
    reactConfession,
    updateAction,
  ]);

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
      } else if (commentId) {
        reactComment({
          variables: {
            commentId,
            reactType: newAction,
          },
        });
      }
    } else {
      showPromoteLoginOrRegisterPopup(true);
    }
  }, [
    action,
    commentId,
    confessionId,
    currentUser?.id,
    reactComment,
    reactConfession,
    updateAction,
  ]);

  return (
    <Box
      display={'flex'}
      alignItems="center"
      h={10}
      b={1}
      border={'1px solid #efefed'}
      w={'max'}
      borderRadius={'1rem'}
    >
      <Box p={2} onClick={upVote}>
        <Icon
          as={BiUpvote}
          color={
            action === ReactionType.Up ? 'var(--color-3)' : 'var(--color-2)'
          }
          boxSize={'1.2rem'}
          cursor={'pointer'}
        />
      </Box>
      <Box as={'span'} fontSize={'1.2rem'} color={'#56595a'}>
        {localVoteNo}
      </Box>
      <Box p={2} onClick={downVote}>
        <Icon
          as={BiDownvote}
          color={
            action === ReactionType.Down ? 'var(--color-3)' : 'var(--color-2)'
          }
          boxSize={'1.2rem'}
          cursor={'pointer'}
        />
      </Box>
    </Box>
  );
};

export default Vote;
