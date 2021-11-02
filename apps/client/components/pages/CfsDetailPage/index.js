import React, { useEffect } from 'react';
import { CfsDetail } from '@cfs/ui';
import {
  useCfsDetailPageQuery,
  useGetRelativeConfessionsLazyQuery,
} from '@cfs/graphql';
import { useRouter } from 'next/router';
import ConfessionSEO from '../../../shared/seo/ConfessionSEO';
import { useReactiveVar } from '@apollo/react-hooks';
import { setNewDeletedCfsByMe, setRecentCatIdsViewedByMe } from '@cfs/helper';
import { RECENT_CAT_IDS_VIEWED_LOCAL_STORAGE_KEY } from '@cfs/common';

const CfsDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const newCfsDeletedByMe = useReactiveVar(setNewDeletedCfsByMe);
  const recentCatIds = useReactiveVar(setRecentCatIdsViewedByMe);

  const { data } = useCfsDetailPageQuery({
    variables: {
      slug,
    },
  });

  const [
    getRelativeConfessions,
    { data: relativeCfsData },
  ] = useGetRelativeConfessionsLazyQuery({
    variables: {
      slug,
    },
  });

  const cfsDetailPageData = data?.confessionBySlug;

  useEffect(() => {
    const catData =
      cfsDetailPageData?.confessionCategories?.nodes?.[0]?.category;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfsDetailPageData?.confessionCategories?.nodes]);

  useEffect(() => {
    if (cfsDetailPageData?.id) {
      getRelativeConfessions({
        variables: {
          targetConfessionId: cfsDetailPageData.id,
        },
      });
    }
  }, [cfsDetailPageData?.id, getRelativeConfessions]);

  useEffect(() => {
    if (newCfsDeletedByMe) {
      if (newCfsDeletedByMe?.id === cfsDetailPageData?.id) {
        router.push('/');
      }
    }
  }, [cfsDetailPageData?.id, newCfsDeletedByMe, router]);

  return (
    <div className="mb-6">
      <ConfessionSEO
        confession={cfsDetailPageData}
        categories={cfsDetailPageData?.confessionCategories?.nodes}
      />
      {cfsDetailPageData && (
        <CfsDetail
          cfsDetailPageData={cfsDetailPageData}
          relativeCfsData={relativeCfsData?.getRelativeConfessions?.nodes}
        />
      )}
    </div>
  );
};

export default CfsDetailPage;
