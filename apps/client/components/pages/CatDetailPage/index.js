import React, { useEffect } from 'react';
import { useCatDetailPageQuery, useGetCfsByCatSlugQuery } from '@cfs/graphql';
import { useRouter } from 'next/router';
import CfsDetailHeader from '../../../../../libs/ui/src/lib/CfsDetail/CfsDetailHeader';
import { CfsList } from '@cfs/ui';
import { usePreviousValue } from '../../../../../libs/helper/src/hooks';

const CatDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const previousCatSlug = usePreviousValue(slug);

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
  } = useGetCfsByCatSlugQuery({
    variables: {
      catSlug: slug,
      offset: 0,
    },
  });
  const confessions = confessionsData?.getCfsByCatSlug?.nodes ?? [];

  useEffect(() => {
    if (previousCatSlug !== slug) {
      fetchMoreCatDetail({
        variables: {
          slug,
        },
      });
      fetchMoreCfs({
        variables: {
          catSlug: slug,
          offset: 0,
        },
      });
    }
  }, [fetchMoreCatDetail, fetchMoreCfs, previousCatSlug, slug]);

  return (
    <div className="ml-2 mr-2 mb-6 bg-color1">
      {catData && <CfsDetailHeader cat={catData} />}
      <CfsList cfsList={confessions} fetchMore={fetchMoreCfs} />
    </div>
  );
};

export default CatDetailPage;
