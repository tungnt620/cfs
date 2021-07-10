import React, { useCallback, useState } from 'react';
import { Button } from 'antd';

const FollowBtn = ({ followed }) => {
  const [isFollow, setIsFollow] = useState(false);

  const toggleFollow = useCallback(() => {
    setIsFollow((prev) => !prev);
  }, []);

  return followed ? null : (
    <Button
      type="link"
      className="p-0 mr-2 h-auto text-sm"
      onClick={toggleFollow}
    >
      {isFollow ? ' Đang theo dõi' : ' Theo dõi'}
    </Button>
  );
};

export default FollowBtn;
