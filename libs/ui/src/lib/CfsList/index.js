import React from 'react';
import CfsMiniCard from '@cfs/ui/CfsMiniCard/CfsMiniCard';
import { setLatestCfsIDGetByMe } from '@cfs/helper/reactiveVars';
import { LATEST_CFS_ID_USER_SAW_LOCAL_STORAGE_KEY } from '@cfs/common/constants';
import { useReactiveVar } from '@apollo/react-hooks';
import { usePagination } from '@cfs/helper/hooks';
import { sendGAUserBehaviorEvent } from '@cfs/helper/analytics';
import { Box, Button } from '@chakra-ui/react';

export const CfsList = ({ cfsList }) => {
  const { offset, goPreviousPage, goNextPage } = usePagination();

  const currentLatestCfsIDUserSaw = useReactiveVar(setLatestCfsIDGetByMe);

  if (offset === 0 && cfsList?.length > 0) {
    const latestCfsIDUserSaw =
      cfsList[0].id > cfsList[cfsList.length - 1].id
        ? cfsList[0].id
        : cfsList[cfsList.length - 1].id;
    if (latestCfsIDUserSaw > currentLatestCfsIDUserSaw) {
      setLatestCfsIDGetByMe(latestCfsIDUserSaw);
      localStorage.setItem(
        LATEST_CFS_ID_USER_SAW_LOCAL_STORAGE_KEY,
        latestCfsIDUserSaw.toString()
      );
    }
  }

  return (
    <Box backgroundColor={'#efefed'}>
      {cfsList.map((cfs) => (
        <CfsMiniCard cfs={cfs} key={cfs.id} />
      ))}
      {cfsList.length === 0 && (
        <Box display='flex' justifyContent='center' mt={10} mb={10}>
          <i>Chưa có bài viết nào</i>
        </Box>
      )}
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        backgroundColor={'white'}
        mt={1}
        pt={3}
      >
        <Button
          onClick={() => {
            goPreviousPage();
            sendGAUserBehaviorEvent({
              category: 'confession list pagination',
              action: 'click',
              label: 'Click previous page',
            });
          }}
          disabled={offset === 0}
        >
          Trước
        </Button>
        <Button
          onClick={() => {
            goNextPage();
            sendGAUserBehaviorEvent({
              category: 'confession list pagination',
              action: 'click',
              label: 'Click next page',
            });
          }}
        >
          Tiếp
        </Button>
      </Box>
    </Box>
  );
};

export default CfsList;
