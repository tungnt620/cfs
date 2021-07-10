import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CardContent.module.scss';

const defaultPhoto =
  'https://storage.googleapis.com/confession-v2-live/b9c70746cf2c5c4a5f77da56da383ae7.jpeg';

const CardContent = ({ photoUrl = defaultPhoto, slug = '/tung' }) => {
  const [expandedThumbnail, setExpandedThumbnail] = useState(false);

  return (
    <>
      <div className="flex justify-between mt-2 mb-2 items-center">
        <Link href={slug}>
          <a>
            <div className="whitespace-normal font-medium leading-5 flex items-center">
              #No1718 JOB KHÔNG LƯƠNG. "Chào tất cả mọi người. Mình là gái khoa
              Kinh tế, hôm na
            </div>
          </a>
        </Link>

        {photoUrl && (
          <div className={`ml-4 h-full cursor-pointer ${styles.smallImage}`}>
            <Image
              src={photoUrl}
              width={60}
              height={60}
              layout="intrinsic"
              onClick={() => {
                setExpandedThumbnail((prev) => !prev);
              }}
            />
          </div>
        )}
      </div>

      {expandedThumbnail && (
        <div style={{ position: 'relative', width: '100%', minHeight: 300 }}>
          <Image
            className="mt-2 mb-2"
            src={photoUrl}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </>
  );
};
export default CardContent;
