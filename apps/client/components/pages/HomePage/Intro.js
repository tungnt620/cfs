import React from 'react';
import { Alert, AlertIcon, AlertTitle, Button, Text } from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper/reactiveVars';
import { useRouter } from 'next/router';

const Intro = () => {
  const router = useRouter();
  const currentUser = useReactiveVar(setCurrentUser);
  const isSilverUser = currentUser?.role === 'moderator';
  const isNormalUser = currentUser?.id && !currentUser?.role;

  const gotoNewCatPage = () => {
    router.push('/c/new/');
  };

  return (
    <>
      <Alert status='info'>
        <AlertIcon />
        Chúng mình vừa sửa lỗi upload file ảnh, bây giờ bạn có thể tạo confession/cộng đồng mới với hình ảnh.
      </Alert>
      <Text fontSize="2xl">
        Xin chào {currentUser?.id ? <b>{currentUser?.username}</b> : 'bạn!'}
      </Text>
      <Text mt={2}>
        Confession.vn là nơi được tạo ra để chúng ta có thể thoải mái chia sẻ,
        tâm sự những niềm vui, nỗi buồn, vướng mắc trong cuộc sống, tình yêu,
        học tập, gia đình, ...
      </Text>
      <Text mt={4}>Cảm ơn bạn đã ghé thăm Confession.vn</Text>
      {isSilverUser && (
        <Text mt={4} color={'silver'}>
          Bạn đang là thành viên bạc.
          <br />
          <br />
          Bây giờ bạn có thể{' '}
          <Button colorScheme="teal" onClick={gotoNewCatPage}>
            Tạo cộng đồng riêng cho mình
          </Button>
        </Text>
      )}
      {isNormalUser && (
        <Text mt={4} color={'#ad6648'}>
          Bạn đang là thành viên đồng.
          <br />
          <br />
          Bây giờ bạn có thể{' '}
          <Button colorScheme="teal" onClick={gotoNewCatPage}>
            Tạo cộng đồng riêng cho mình
          </Button>
        </Text>
      )}
    </>
  );
};

export default Intro;
