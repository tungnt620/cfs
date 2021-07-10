import React from 'react';
import styles from '../shared/styles';
import ListShortConfessionInfo from '../ListShortConfessionInfo';
import ListCategoryInTags from '../ListCategoryInTags';
import PopularListCategoryInTags from '../PopularListCategoryInTags';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  CATEGORY_DETAIL_DATA,
  CONFESSION_DETAIL_DATA,
} from '../../shared/commonGPL';
import { LIMIT_CATEGORY_FETCH } from '../../shared/constants';
import { useViewTracking } from '../../shared/hooks';
import IndexSEO from './helpers/seo/IndexSEO';
import Image from 'next/image';

const GET_DATA = gql`
  query getData($offset: Int, $limit: Int, $categoryLimit: Int) {
    confessions(offset: $offset, limit: $limit) {
      ...ConfessionDetailCommonField
    }
    categories(limit: $categoryLimit, offset: 0) {
      ...CategoryDetailCommonField
    }
  }
  ${CONFESSION_DETAIL_DATA}
  ${CATEGORY_DETAIL_DATA}
`;

const HomePage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_DATA, {
    variables: {
      offset: 0,
      limit: 10,
      categoryLimit: LIMIT_CATEGORY_FETCH,
    },
  });

  useViewTracking(-1000000);

  const fetchMoreConfession = (e) => {
    return fetchMore({
      variables: {
        offset: data.confessions.length,
        categoryLimit: 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          confessions: [...prev.confessions, ...fetchMoreResult.confessions],
        });
      },
    });
  };

  if (loading) return 'Loading ...';
  if (error) return `Error! ${error.message}`;

  const { confessions, categories } = data;

  return (
    <>
      <IndexSEO />

      <div className="flex">
        <div
          className="hidden sm:block"
          style={{
            minWidth: '200px',
            borderRight: '1px solid green',
            height: '100vh',
          }}
        />
        <div style={{ flex: 1 }}>
          <nav className="flex flex-row border-b border-blue-100 text-sm bg-gray-100">
            <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
              Mới
            </button>
            <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
              Nổi bật
            </button>
            <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
              Tuần
            </button>
            <button className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
              Tháng
            </button>
          </nav>
          <div className="flex">
            <div className="w-20 flex flex-col bg-gray-100 text-lg p-1.5">
              <div className="flex flex-row justify-end">
                <div className="mr-1">10</div>
                <Image src="/images/like.svg" width={20} height={20} />
              </div>
              <div className="flex flex-row justify-end">
                <div className="mr-1">5</div>
                <Image src="/images/chat.svg" width={20} height={20} />
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div
          className="hidden sm:block"
          style={{
            minWidth: '200px',
            borderLeft: '1px solid green',
            height: '100vh',
          }}
        />
      </div>

      {/*<div style={{ margin: '30px 0 30px 0' }}>*/}
      {/*  <section className={'main-content'}>*/}
      {/*    <PopularListCategoryInTags categories={categories} />*/}
      {/*    <ListShortConfessionInfo*/}
      {/*      confessions={confessions}*/}
      {/*      fetchMoreConfession={fetchMoreConfession}*/}
      {/*      loading={loading}*/}
      {/*    />*/}
      {/*  </section>*/}
      {/*  <aside className={'right-sidebar'}>*/}
      {/*    <ListCategoryInTags categories={categories} />*/}
      {/*  </aside>*/}
      {/*</div>*/}
      <style jsx>{styles}</style>
    </>
  );
};

export default HomePage;
