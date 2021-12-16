import React, { useEffect, useMemo, useState } from 'react';
import CfsDetailHeader from './CfsDetailHeader';
import Image from 'next/image';
import dayjs from 'dayjs';
import style from './CfsDetail.module.scss';
import { useBooleanToggle } from '@cfs/helper/hooks';
import { findNumberOccurrenceInString } from '@cfs/helper/string';
import Loading from '../common/Loading';
import emptyImage from '../images/empty.png';
import { AiOutlineUser } from 'react-icons/ai';
import { Image as ChakraImage, Avatar, Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const CommentSection = dynamic(() => import('../CommentSection'), {
  loading: () => <Loading />,
});
const CfsMiniCard = dynamic(() => import('../CfsMiniCard/CfsMiniCard'), {
  loading: () => <Loading />,
});
const CardActions = dynamic(() => import('../CfsMiniCard/CardActions'), {
  loading: () => <Loading />,
});

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const youtubeSubLinkRegex = /.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^ \n#&?]*).*/g;
const youtubeLinkRegex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^ \n#&?]*).*/;

function addYoutubeEmbed(content) {
  let newContent = content;
  const youtubeLinks = newContent.match(youtubeSubLinkRegex);

  if (youtubeLinks?.length) {
    for (const youtubeLink of youtubeLinks) {
      const videoId = youtubeLink.match(youtubeLinkRegex)[2];
      const embedLink = `https://www.youtube.com/embed/${videoId}`;
      const embedYoutube = `<div style='width: 100%; display: flex; justify-content: center'><iframe style='width: 400px; height: 315px;' src='${embedLink}' allowfullscreen></iframe></div>`;
      newContent = newContent.split(youtubeLink).join(embedYoutube);
    }
  }

  return newContent;
}

const CfsDetail = ({ cfsDetailPageData, relativeCfsData }) => {
  const [expandedThumbnail, toggleExpandedThumbnail] = useBooleanToggle(false);
  const userData = cfsDetailPageData.user;
  const catData = cfsDetailPageData.confessionCategories.nodes[0]?.category;
  const [content, setContent] = useState(cfsDetailPageData.content);

  const isTitleCopyFromContent = useMemo(() => {
    const firstParagraph = cfsDetailPageData.content.substring(0, 200);
    return (
      firstParagraph
        .replace(/[\r\n]+/g, '. ')
        .includes(cfsDetailPageData.title) ||
      firstParagraph.replace(/[\r\n]+/g, ' ').includes(cfsDetailPageData.title)
    );
  }, [cfsDetailPageData.content, cfsDetailPageData.title]);

  // TODO: Fix this, use approach like youtube embed
  const isContainSelfLink = useMemo(() => {
    const numberOfLink = findNumberOccurrenceInString(
      cfsDetailPageData.content,
      '<a href='
    );
    const numberOfSelfLink = findNumberOccurrenceInString(
      cfsDetailPageData.content,
      '<a href="https://confession.vn'
    );
    return numberOfSelfLink === numberOfLink;
  }, [cfsDetailPageData.content]);

  useEffect(() => {
    if (cfsDetailPageData.content) {
      setContent(addYoutubeEmbed(cfsDetailPageData.content));
    }
  }, [cfsDetailPageData.content]);

  return (
    <main>
      <CfsDetailHeader cat={catData} />
      <Box ml={1} mr={1}>
        <Box
          as={'header'}
          display={'flex'}
          mt={1}
          pt={2}
          pb={2}
          lineHeight={'1.25rem'}
        >
          <Box display="flex" alignment="center">
            <Box w={6} h={6} mr={1}>
              <Avatar h={'100%'} w={'100%'} icon={<AiOutlineUser />} />
            </Box>

            <Box
              mr={4}
              fontWeight={'medium'}
              fontSize={'0.875rem'}
              lineHeight={'1.25rem'}
            >
              {userData.username}
            </Box>

            <Box>
              <Box
                as={'span'}
                fontSize={'0.875rem'}
                lineHeight={'1.25rem'}
                whiteSpace={'nowrap'}
                color={'#11182796'}
              >
                {dayjs(cfsDetailPageData.createdAt).fromNow()}
              </Box>
            </Box>
          </Box>
          <Box display="flex" w={'full'} justifyContent={'flex-end'}>
            {/*<MoreActions />*/}
          </Box>
        </Box>

        <Box fontWeight={'medium'} fontSize={'1.125rem'} lineHeight={'1.75rem'}>
          {!isTitleCopyFromContent && cfsDetailPageData.title}
        </Box>

        {expandedThumbnail ? (
          <Box display="flex" alignment="center" justifyContent={'center'}>
            <ChakraImage
              alt="Hình mô tả cho bài confession"
              src={cfsDetailPageData.image}
              fallbackSrc={emptyImage}
            />
          </Box>
        ) : (
          cfsDetailPageData.image && (
            <Box position={'relative'} w={'full'} mt={2} minH={'300px'}>
              <Image
                alt="Hình mô tả cho bài confession"
                src={cfsDetailPageData.image}
                layout="fill"
                objectFit="contain"
                onClick={toggleExpandedThumbnail}
              />
            </Box>
          )
        )}

        {isContainSelfLink ? (
          <Box
            pt={2}
            mb={4}
            whiteSpace={'pre-line'}
            className={style.highlightLink}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <Box pt={2} mb={4} whiteSpace={'pre-line'}>
            {content}
          </Box>
        )}

        <Box mb={4}>
          <CardActions cfs={cfsDetailPageData} />
        </Box>
      </Box>

      <CommentSection cfsId={cfsDetailPageData.id} />

      {relativeCfsData && (
        <Box mt={8} ml={2} mr={2}>
          <Box
            as={'h3'}
            fontWeight={'bold'}
            fontSize={'1rem'}
            lineHeight={'1.5rem'}
          >
            Confession khác có thể bạn thích
          </Box>
          {relativeCfsData.map((cfs) => (
            <CfsMiniCard cfs={cfs} key={cfs.id} />
          ))}
        </Box>
      )}
    </main>
  );
};

export default CfsDetail;
