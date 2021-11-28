import React from 'react';
import { Box, Image as ChakraImage, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useBooleanToggle } from '@cfs/helper/hooks';
import emptyImage from '@cfs/ui/images/empty.png';
import Comment from '@cfs/ui/common/Comment';
import Vote from '@cfs/ui/CfsMiniCard/CardActions/Vote';
import Link from 'next/link';

const CommentItem = ({ comment }) => {
  const [expandedThumbnail, toggleExpandedThumbnail] = useBooleanToggle(false);

  const catSlug =
    comment.confession.confessionCategories.nodes?.[0]?.category?.slug;
  const cfsSlug = comment.confession.slug;

  return (
    <Comment
      content={
        <>
          {expandedThumbnail ? (
            <Box display="flex" alignItems="center" justifyContent={'center'}>
              <ChakraImage
                alt="Ảnh trong comment"
                src={comment.image}
                fallbackSrc={emptyImage}
              />
            </Box>
          ) : (
            comment.image && (
              <Box
                position="relative"
                w="full"
                minHeight={'200px'}
                cursor={'pointer'}
              >
                <Image
                  alt="Ảnh trong comment"
                  src={comment.image}
                  layout="fill"
                  objectFit="contain"
                  onClick={toggleExpandedThumbnail}
                />
              </Box>
            )
          )}

          <Link href={`/${cfsSlug}/`}>
            <a>
              <p>{comment.content}</p>
            </a>
          </Link>
          <Box mt={4}>
            <Box
              fontStyle={'italic'}
              fontSize={'0.9rem'}
              display={'inline'}
              fontWeight={400}
            >
              trong
            </Box>{' '}
            <Link href={`/c/${catSlug}/`}>
              <a>
                <Text
                  display={'inline'}
                  fontSize={'0.9rem'}
                  fontWeight={'bold'}
                >
                  c/{catSlug}
                </Text>
              </a>
            </Link>
          </Box>
        </>
      }
      username={comment.user?.username ?? comment.authorName}
      time={comment.createdAt}
      actions={
        <Box display={'flex'} alignItems="center">
          <Vote
            voteNo={comment.totalReaction}
            commentId={comment.id}
            oldUserAction={comment.userCommentReaction?.nodes?.[0]?.reactType}
          />

          <Box ml={2} display={'inline'}>
            <Link href={`/${cfsSlug}/`}>
              <a>
                <Text
                  display={'inline'}
                  fontSize={'0.9rem'}
                  fontWeight={'bold'}
                >
                  Xem confession
                </Text>
              </a>
            </Link>
          </Box>
        </Box>
      }
      mb={6}
    />
  );
};

export default CommentItem;
