import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import emptyImage from '../../images/empty.png';
import dayjs from 'dayjs';
import MoreActions from './MoreActions';
import { useReactiveVar } from '@apollo/react-hooks';
import { setCurrentUser } from '@cfs/helper/reactiveVars';
import { Box } from '@chakra-ui/react';

require('dayjs/locale/vi');
dayjs.locale('vi');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const CardHeader = ({ cfs }) => {
  const catData = cfs?.confessionCategories?.nodes?.[0]?.category ?? {};
  const currentUser = useReactiveVar(setCurrentUser);

  return (
    <Box as={'header'} display={'flex'} mt={1} pt={2} lineHeight={'1.25rem'}>
      <Box display={'flex'} alignItems={'center'}>
        <Link href={`/c/${catData.slug}/`}>
          <a>
            <Box w={6} h={6} mr={1}>
              <Image
                alt={`Ảnh đại diện của ${catData.name}`}
                className="rounded-full"
                src={catData.image ?? emptyImage}
                width={24}
                height={24}
              />
            </Box>
          </a>
        </Link>

        <Link href={`/c/${catData.slug}/`}>
          <a>
            <Box
              mr={2}
              fontSize={'.875rem'}
              lineHeight={'1.25rem'}
              fontWeight={'medium'}
              whiteSpace={'nowrap'}
            >
              c/{catData.slug}
            </Box>
          </a>
        </Link>

        <Link href={`/${cfs?.slug}/`}>
          <a>
            <div>
              <Box
                as={'span'}
                fontSize={'.875rem'}
                lineHeight={'1.25rem'}
                whiteSpace={'nowrap'}
                color={'#11182796'}
              >
                {dayjs(cfs?.createdAt).fromNow()}
              </Box>
            </div>
          </a>
        </Link>
      </Box>
      <Box display={'flex'} w={'full'} justifyContent={'flex-end'}>
        {(currentUser?.isAdmin || cfs?.userId === currentUser?.id) && (
          <MoreActions cfs={cfs} />
        )}
      </Box>
    </Box>
  );
};

export default CardHeader;
