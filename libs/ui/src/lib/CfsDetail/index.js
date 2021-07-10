import React from 'react';
import CfsDetailHeader from './CfsDetailHeader';
import CommentSection from '../CommentSection';
import Image from 'next/image';
import MoreActions from '../CfsMiniCard/CardHeader/MoreActions';
import CardActions from '../CfsMiniCard/CardActions';

const CfsDetail = () => {
  return (
    <div>
      <CfsDetailHeader />
      <div className="ml-1 mr-1">
        <header className="flex mt-1 pt-2 pb-2 leading-5">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-1">
              <Image
                className="rounded-full w-6 h-6"
                src="https://confession.vn/wp-content/uploads/2018/01/hustconfession.jpg"
                width={24}
                height={24}
              />
            </div>

            <div className="mr-4 text-sm font-medium">tung</div>

            <div>
              <span className="text-sm opacity-40">12h</span>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <MoreActions />
          </div>
        </header>

        <div className="font-medium text-lg">
          #No1718 JOB KHÔNG LƯƠNG. "Chào tất cả mọi người. Mình là gái khoa Kinh
          tế, hôm na
        </div>

        <div className="relative w-full h-full mt-2">
          <Image
            src="https://confession.vn/wp-content/uploads/2018/01/neuconfessions.jpg"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="pt-2 mb-4">
          #No1718 JOB KHÔNG LƯƠNG "Chào tất cả mọi người. Mình là gái khoa Kinh
          tế, hôm nay mạnh dạn viết cfs với mong muốn tìm một anh người yêu Mình
          cao m6, cũng được gọi là xinh xắn, tính mình rất dễ gần và cởi mở.
          Mình cần tìm một mối quan hệ tình cảm nghiêm túc và lâu dài. Mình thì
          thích một bạn nam: cao hơn mình, tâm lý, có kinh tế càng tốt ^^ Bạn
          nào thấy được cmt bên dưới mình addfr nha. Love all " ________________
          #Pin nổ pro5 chốt đơn liền mấy ông ơiii
        </div>

        <div className="mb-4">
          <CardActions />
        </div>
      </div>

      <CommentSection />
    </div>
  );
};

export default CfsDetail;
