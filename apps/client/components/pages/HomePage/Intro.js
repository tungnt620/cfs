import React from 'react';
import { Text } from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper/reactiveVars';

const Intro = () => {
  const currentUser = useReactiveVar(setCurrentUser);
  const isSilverUser = currentUser?.role === 'moderator';
  const isNormalUser = currentUser?.id && !currentUser?.role;

  return (
    <>
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
          <br/>
          Bây giờ bạn có thể tạo cộng đồng cho riêng mình
        </Text>
      )}
      {isNormalUser && (
        <Text mt={4} color={'#ad6648'}>
          Bạn đang là thành viên đồng
        </Text>
      )}
    </>
  );
};

export default Intro;
