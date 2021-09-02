import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Image as AntdImage } from 'antd';
import styles from './CardContent.module.scss';
import useBooleanToggle from '../../../../../helper/src/hooks';

const CardContent = ({ cfs }) => {
  const { image, slug, title } = cfs;
  const [expandedThumbnail, toggleExpandedThumbnail] = useBooleanToggle(false);

  return (
    <>
      <div className="flex justify-between mt-2 mb-2 items-center">
        <Link href={`/${slug}`}>
          <a className="w-full">
            <div className="whitespace-normal font-medium leading-5 flex items-center">
              {title}
            </div>
          </a>
        </Link>

        {image && (
          <div className={`ml-4 h-full cursor-pointer ${styles.smallImage}`}>
            <Image
              src={image}
              width={60}
              height={60}
              layout="intrinsic"
              onClick={toggleExpandedThumbnail}
            />
          </div>
        )}
      </div>

      {expandedThumbnail && (
        <div className="flex items-center justify-center">
          <AntdImage src={image} />
        </div>
      )}
    </>
  );
};

export default CardContent;
