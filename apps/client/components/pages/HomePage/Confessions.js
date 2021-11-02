import React, { useEffect } from 'react';
import { CfsList } from '@cfs/ui';
import { useHomePageQuery } from '@cfs/graphql';
import { useReactiveVar } from '@apollo/react-hooks';
import {
  setCurrentUser,
  setNewCfsCreatedByMe,
  setNewDeletedCfsByMe,
} from '@cfs/helper';
import { usePagination } from '@cfs/helper';

const Confessions = () => {
  const { offset } = usePagination();

  const newCfsCreatedByMe = useReactiveVar(setNewCfsCreatedByMe);
  const newCfsDeletedByMe = useReactiveVar(setNewDeletedCfsByMe);

  const currentUser = useReactiveVar(setCurrentUser);

  const { data: queryData, fetchMore, refetch } = useHomePageQuery({
    variables: { offset, catId: 0 },
  });

  const confessions = queryData?.getCfsByCat?.nodes ?? [];

  useEffect(() => {
    fetchMore({ variables: { offset, catId: 0 } });
  }, [fetchMore, offset]);

  // Re-fetch to get data relative user
  useEffect(() => {
    if (currentUser?.id) {
      refetch();
    }
  }, [currentUser, refetch]);

  useEffect(() => {
    if (newCfsCreatedByMe) {
      refetch();
    }
  }, [refetch, newCfsCreatedByMe]);

  useEffect(() => {
    if (newCfsDeletedByMe) {
      refetch();
    }
  }, [refetch, newCfsDeletedByMe]);

  return <CfsList cfsList={confessions} />;
};

export default Confessions;
