import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useReactiveVar } from '@apollo/react-hooks';
import {
  setCurrentUser,
  showLoginPopup,
} from '../../../../libs/helper/src/reactiveVars';
import { useRouter } from 'next/router';

const CreateNewCfs = () => {
  const router = useRouter();
  const currentUser = useReactiveVar(setCurrentUser);

  const onClick = useCallback(() => {
    if (!currentUser?.id) {
      showLoginPopup(true);
    } else {
      router.push('/new');
    }
  }, [currentUser?.id, router]);

  return (
    <Button type="primary" onClick={onClick}>
      Viết bài
    </Button>
  );
};

export default CreateNewCfs;
