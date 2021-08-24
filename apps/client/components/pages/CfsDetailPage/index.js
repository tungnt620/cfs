import React from 'react';
import { CfsDetail } from '@cfs/ui';
import { useCfsDetailPageQuery } from '@cfs/graphql';
import { useRouter } from 'next/router';

const CfsDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading } = useCfsDetailPageQuery({
    variables: {
      slug,
    },
  });

  const cfsDetailPageData = data?.confessionBySlug;

  return (
    <div className="mb-6">
      {cfsDetailPageData && <CfsDetail cfsDetailPageData={cfsDetailPageData} />}
    </div>
  );
};

export default CfsDetailPage;
