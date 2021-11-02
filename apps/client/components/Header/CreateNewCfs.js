import React, { useCallback } from 'react';
import { Button } from "@chakra-ui/react"
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser, showPromoteLoginOrRegisterPopup } from '@cfs/helper';
import { useRouter } from 'next/router';

const CreateNewCfs = () => {
  const router = useRouter();
  const currentUser = useReactiveVar(setCurrentUser);

  const onClick = useCallback(() => {
    if (!currentUser?.id) {
      showPromoteLoginOrRegisterPopup(true);
    } else {
      router.push('/new');
    }
  }, [currentUser?.id, router]);

  return (
    <Button colorScheme="blue" onClick={onClick}>
      Viết bài
    </Button>
  );
};

export default CreateNewCfs;
