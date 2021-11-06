import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../../../common/Loading';
import { Icon } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs'

const MoreActionsModal = dynamic(() => import('./MoreActionsModal'), {
  loading: () => <Loading />,
});

const MoreActions = ({ cfs }) => {
  const [modalDisplayed, setModalDisplayed] = useState(false);

  const toggle = useCallback(() => {
    setModalDisplayed((prev) => !prev);
  }, []);

  return (
    <>
      <Icon onClick={toggle} as={BsThreeDotsVertical} cursor={'pointer'} />
      {modalDisplayed && (
        <MoreActionsModal cfs={cfs} setModalDisplayed={setModalDisplayed} />
      )}
    </>
  );
};

export default MoreActions;
