import React, { useEffect } from 'react';
import { useCatDetailPageQuery, useGetCfsByCatSlugQuery } from '@cfs/graphql';
import { useRouter } from 'next/router';
import { CfsDetailHeader } from '@cfs/ui';
import { CfsList } from '@cfs/ui';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser, setNewDeletedCfsByMe } from '@cfs/helper';
import CategorySEO from '../../../shared/seo/CategorySEO';
import { usePagination } from '../../helpers/hooks';

const CatDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const currentUser = useReactiveVar(setCurrentUser);
  const newCfsDeletedByMe = useReactiveVar(setNewDeletedCfsByMe);
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
