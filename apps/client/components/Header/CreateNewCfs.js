import React, { useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CreateNewCfs = () => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push('/new');
  }, [router]);

  return (
    <Button colorScheme="blue" onClick={onClick}>
      Viết bài
    </Button>
  );
};

export default CreateNewCfs;
