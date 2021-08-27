import React from 'react';
import { useCatDetailPageQuery, useGetCfsByCatSlugQuery } from '@cfs/graphql';
import { useRouter } from 'next/router';
import CfsDetailHeader from '../../../../../libs/ui/src/lib/CfsDetail/CfsDetailHeader';
import { CfsList } from '@cfs/ui';

const CatDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: catDetailData } = useCatDetailPageQuery({
    variables: {
      slug,
    },
  });
  const catData = catDetailData?.categoryBySlug ?? {};

  const { data: confessionsData, fetchMore } = useGetCfsByCatSlugQuery({
    variables: {
      catSlug: slug,
      offset: 0,
    },
  });
  const confessions = confessionsData?.getCfsByCatSlug?.nodes ?? [];

  return (
    <div className="ml-2 mr-2 mb-6 bg-color1">
      {catData && <CfsDetailHeader cat={catData} />}
      <CfsList cfsList={confessions} fetchMore={fetchMore} />
    </div>
  );
};

export default CatDetailPage;
