import React, { useEffect } from 'react';
import { CfsDetail } from '@cfs/ui';
import {
  useCfsDetailPageQuery,
  useGetRelativeConfessionsLazyQuery,
} from '@cfs/graphql';
import { useRouter } from 'next/router';

const CfsDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

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
    if (cfsDetailPageData?.id) {
      getRelativeConfessions({
        variables: {
          targetConfessionId: cfsDetailPageData.id,
        },
      });
    }
  }, [cfsDetailPageData?.id, getRelativeConfessions]);

  return (
    <div className="mb-6">
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
