import React, { useEffect } from 'react';
import { useCatDetailPageQuery, useGetCfsByCatSlugQuery } from '@cfs/graphql';
import { useRouter } from 'next/router';
import { CfsDetailHeader } from '@cfs/ui';
import { CfsList } from '@cfs/ui';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser, setNewDeletedCfsByMe, usePreviousValue } from '@cfs/helper';
import CategorySEO from '../../../shared/seo/CategorySEO';

const CatDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const previousCatSlug = usePreviousValue(slug);
  const currentUser = useReactiveVar(setCurrentUser);
  const newCfsDeletedByMe = useReactiveVar(setNewDeletedCfsByMe);

  const {
    data: catDetailData,
    fetchMore: fetchMoreCatDetail,
  } = useCatDetailPageQuery({
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
      offset: 0,
    },
  });
  const confessions = confessionsData?.getCfsByCatSlug?.nodes ?? [];

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

  useEffect(() => {
    if (previousCatSlug && previousCatSlug !== slug) {
      fetchMoreCatDetail({
        variables: {
          slug,
        },
      });
      refetchCfs();
    }
  }, [fetchMoreCatDetail, refetchCfs, previousCatSlug, slug]);

  return (
    <div className="ml-2 mr-2 mb-6 bg-color1">
      <CategorySEO category={catData} />
      {catData && <CfsDetailHeader cat={catData} />}
      <main>
        <CfsList cfsList={confessions} fetchMore={fetchMoreCfs} />
      </main>
    </div>
  );
};

export default CatDetailPage;
