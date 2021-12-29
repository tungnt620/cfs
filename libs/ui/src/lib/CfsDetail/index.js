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
import { addYoutubeEmbed } from '@cfs/common/embedContent';

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

const CfsDetail = ({ cfsDetailPageData, relativeCfsData }) => {
  const [expandedThumbnail, toggleExpandedThumbnail] = useBooleanToggle(false);
  const userData = cfsDetailPageData.user;
  const catData = cfsDetailPageData.confessionCategories.nodes[0]?.category;
  const [content, setContent] = useState([cfsDetailPageData.content]);

  const isTitleCopyFromContent = useMemo(() => {
    const firstParagraph = cfsDetailPageData.content.substring(0, 200);
    return (
      firstParagraph
        .replace(/[\r\n]+/g, '. ')
        .includes(cfsDetailPageData.title) ||
      firstParagraph.replace(/[\r\n]+/g, ' ').includes(cfsDetailPageData.title)
    );
  }, [cfsDetailPageData.content, cfsDetailPageData.title]);

  const isContainSelfLink = useMemo(() => {
    const _content = cfsDetailPageData.content;
    const no1 = findNumberOccurrenceInString(_content, '<a href=');
    const no2 = findNumberOccurrenceInString(_content, '<a href="https://confession.vn');
    const no3 = findNumberOccurrenceInString(_content, '<a  href=');
    const no4 = findNumberOccurrenceInString(_content, '<a  href="https://confession.vn');
    return (no1 === no2 && no1 > 0) || (no3 === no4 && no3 > 0);
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
            dangerouslySetInnerHTML={{ __html: content?.[0] }}
          />
        ) : (
          <Box pt={2} mb={4} whiteSpace={'pre-line'}>
            {content.map(item => item)}
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
