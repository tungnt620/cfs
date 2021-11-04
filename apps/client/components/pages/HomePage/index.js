import React, { useEffect, useState } from 'react';
import {
  Box,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Loading } from '@cfs/ui';
import { AiOutlineHome } from 'react-icons/ai';
import { FiSun } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { useReactiveVar } from '@apollo/react-hooks';
import { setLatestCfsIDGetByMe, setLatestCommentIDGetByMe } from '@cfs/helper';
import { useSharedLazyQuery } from '@cfs/graphql';
import Header from '../../Header';
import { useRouter } from 'next/router';

const Confessions = dynamic(() => import('./Confessions'), {
  loading: () => <Loading />,
});
const CommentList = dynamic(() => import('../../CommentList'), {
  loading: () => <Loading />,
});
const Categories = dynamic(() => import('./Categories'), {
  loading: () => <Loading />,
});
const Intro = dynamic(() => import('./Intro'), {
  loading: () => <Loading />,
});

const HomePage = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [getShareData, { data: shareData }] = useSharedLazyQuery();

  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');
  const currentLatestCommentIDUserSaw = useReactiveVar(
    setLatestCommentIDGetByMe
  );
  const currentLatestCfsIDUserSaw = useReactiveVar(setLatestCfsIDGetByMe);

  const [isHaveNewCfs, setIsHaveNewCfs] = useState(false);
  const [isHaveNewComment, setIsHaveNewComment] = useState(false);

  useEffect(() => {
    getShareData();
  }, [getShareData]);

  useEffect(() => {
    const latestCfsId = shareData?.confessions?.nodes?.[0]?.id;
    if (latestCfsId) {
      setIsHaveNewCfs(currentLatestCfsIDUserSaw < latestCfsId);
    }
  }, [currentLatestCfsIDUserSaw, shareData?.confessions]);

  useEffect(() => {
    const latestCommentId = shareData?.comments?.nodes?.[0]?.id;
    if (latestCommentId) {
      setIsHaveNewComment(currentLatestCommentIDUserSaw < latestCommentId);
    }
  }, [currentLatestCommentIDUserSaw, shareData?.comments]);

  useEffect(() => {
    setTabIndex(Number(router.query.tabIndex || 0));
  }, [router.query.tabIndex]);

  const onChangeTab = (index) => {
    router.push(`/?tabIndex=${index}`);
    setTabIndex(index);
  };

  return (
    <>
      <Header />
      <Box className="block bg-white pb-4" maxWidth={900} margin={'0 auto'}>
        <Tabs
          isLazy={true}
          marginTop={4}
          variant="soft-rounded"
          colorScheme="green"
          onChange={onChangeTab}
          index={tabIndex}
        >
          <TabList justifyContent="center" mb={8}>
            <Tab flexDirection="column">
              <Icon as={AiOutlineHome} boxSize="2em" />
              <Box fontSize={isLargerThan900 ? '1rem' : '0.8rem'}>Home</Box>
            </Tab>
            <Tab flexDirection="column" position="relative">
              <Icon as={FiSun} boxSize="2em" />
              <Box fontSize={isLargerThan900 ? '1rem' : '0.8rem'}>Mới</Box>
              {isHaveNewCfs && (
                <Box
                  position={'absolute'}
                  backgroundColor="#ff4d4f"
                  width="10px"
                  height="10px"
                  top={0}
                  right={'10px'}
                  borderRadius={'50%'}
                />
              )}
            </Tab>
            <Tab flexDirection="column">
              <Icon as={BiCategory} boxSize="2em" />
              <Box fontSize={isLargerThan900 ? '1rem' : '0.8rem'}>
                Cộng đồng
              </Box>
            </Tab>
            <Tab flexDirection="column" position="relative">
              <Icon as={FaRegComment} boxSize="2em" />
              <Box fontSize={isLargerThan900 ? '1rem' : '0.8rem'}>
                Bình luận
              </Box>
              {isHaveNewComment && (
                <Box
                  position={'absolute'}
                  backgroundColor="#ff4d4f"
                  width="10px"
                  height="10px"
                  top={0}
                  right={'10px'}
                  borderRadius={'50%'}
                />
              )}
            </Tab>
          </TabList>
          <TabPanels padding={0}>
            <TabPanel padding={2}>
              <Intro />
            </TabPanel>
            <TabPanel padding={2}>
              <Confessions />
            </TabPanel>
            <TabPanel padding={2}>
              <Categories />
            </TabPanel>
            <TabPanel padding={2}>
              <CommentList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default HomePage;
