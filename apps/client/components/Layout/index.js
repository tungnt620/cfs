import React, { useEffect } from 'react';
import { setCurrentUser } from '@cfs/helper';
import { useSharedLazyQuery } from '@cfs/graphql';

const MainLayout = ({ children }) => {
  const [getShareData, { data: shareData }] = useSharedLazyQuery();

  useEffect(() => {
    getShareData();
  }, [getShareData]);

  useEffect(() => {
    if (shareData?.currentUser) setCurrentUser(shareData.currentUser);
  }, [shareData?.currentUser]);

  return (
    <div className="max-w-screen-xl mx-auto my-0">
      {children}
    </div>
  );
};

export default MainLayout;
