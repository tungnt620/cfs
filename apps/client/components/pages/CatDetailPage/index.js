import React, { useEffect } from 'react';
import { useCatDetailPageQuery, useGetCfsByCatSlugQuery } from '@cfs/graphql';
import { useRouter } from 'next/router';
import { CfsDetailHeader } from '@cfs/ui';
import { CfsList } from '@cfs/ui';
import { useReactiveVar } from '@apollo/react-hooks';
import {
  setCurrentUser,
  setNewDeletedCfsByMe,
  usePagination,
  sendGAUserBehaviorEvent,
  setRecentCatIdsViewedByMe,
} from '@cfs/helper';
import CategorySEO from '../../../shared/seo/CategorySEO';
import { RECENT_CAT_IDS_VIEWED_LOCAL_STORAGE_KEY } from '@cfs/common';

const CatDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const currentUser = useReactiveVar(setCurrentUser);
  const newCfsDeletedByMe = useReactiveVar(setNewDeletedCfsByMe);
  const recentCatIds = useReactiveVar(setRecentCatIdsViewedByMe);
  const { offset } = usePagination();

  const { data: catDetailData } = useCatDetailPageQuery({
    variables: {
      slug,
    },
  });
  const catData = catDetailData?.categoryBySlug ?? {};

  const {
    data: confessionsData,
    fetchMore: fetchMoreCfs,
    refetch: refetchCfs,
  } = useGetCfsByCatSlugQuery({
    variables: {
      catSlug: slug,
      offset,
    },
  });
  const confessions = confessionsData?.getCfsByCatSlug?.nodes ?? [];

  useEffect(() => {
    sendGAUserBehaviorEvent({
      category: 'category detail',
      action: 'open',
      label: 'Open category detail page',
    });
  }, []);

  useEffect(() => {
    if (catData?.id) {
      const uniqueCatIdSet = new Set(recentCatIds);
      uniqueCatIdSet.add(catData.id);
      const catIdsViewed = [...uniqueCatIdSet];
      setRecentCatIdsViewedByMe(catIdsViewed);
      localStorage.setItem(
        RECENT_CAT_IDS_VIEWED_LOCAL_STORAGE_KEY,
        catIdsViewed.join(',')
      );
    }
  }, [catData?.id, recentCatIds]);

  useEffect(() => {
    fetchMoreCfs({ variables: { offset, catSlug: slug } });
  }, [fetchMoreCfs, offset, router, slug]);

  // Re-fetch to get data relative user
  useEffect(() => {
    if (currentUser?.id) {
      refetchCfs();
    }
  }, [currentUser, refetchCfs]);

  useEffect(() => {
    if (newCfsDeletedByMe) {
      refetchCfs();
    }
  }, [refetchCfs, newCfsDeletedByMe]);

  return (
    <div className="ml-2 mr-2 mb-6 bg-color1">
      <CategorySEO category={catData} />
      {catData && <CfsDetailHeader cat={catData} />}
      <main>
        <CfsList cfsList={confessions} />
      </main>
    </div>
  );
};

export default CatDetailPage;
