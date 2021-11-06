import React, { useCallback } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Vote from './Vote';
import Comment from './Comment';
import { Box, Icon, useToast } from '@chakra-ui/react';
import { FiShare } from 'react-icons/fi';

const CardActions = ({ cfs }) => {
  const toast = useToast();

  const onCopy = useCallback(() => {
    toast({
      title: `Link đã được sao chép, bạn có thể dán ở bất kì đâu để chia sẻ`,
      position: 'top',
      isClosable: true,
      status: 'success',
    });
  }, [toast]);

  return (
    <Box as="footer" display={'flex'} justifyContent={'space-between'} pb={2}>
      <Box display="flex">
        <Vote
          voteNo={cfs.totalReaction}
          oldUserAction={cfs.userConfessionReactions.nodes?.[0]?.reactType}
          confessionId={cfs.id}
        />
        <Box ml={2}>
          <Comment
            numberOfComment={cfs?.comments?.totalCount ?? 0}
            url={`/${cfs?.slug ?? ''}/#comments`}
          />
        </Box>
      </Box>
      <Box
        border={'1px solid #efefed'}
        borderRadius={'99999px'}
        height="40px"
        width="40px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
      >
        <CopyToClipboard
          text={`https://confession.vn/${cfs?.slug}`}
          onCopy={onCopy}
        >
          <Icon as={FiShare} height="20px" width="20px" />
        </CopyToClipboard>
      </Box>
    </Box>
  );
};

export default CardActions;
