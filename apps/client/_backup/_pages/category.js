import React from 'react';
import MainLayout from 'components/Layout';
import Header from 'components/Header';
import styles from '../shared/styles';
import ListShortConfessionInfo from '../ListShortConfessionInfo';
import { useRouter } from 'next/router';
import ListCategoryInTags from '../ListCategoryInTags';
import { gql } from 'apollo-boost';
import {
  CATEGORY_DETAIL_DATA,
  CONFESSION_DETAIL_DATA,
} from '../../shared/commonGPL';
import { useQuery } from '@apollo/react-hooks';
import { LIMIT_CATEGORY_FETCH } from '../../shared/constants';
import { useViewTracking } from '../../shared/hooks';
import CategorySEO from './helpers/seo/CategorySEO';

const GET_DATA = gql`
  query getData(
    $offset: Int
    $limit: Int
    $categoryLimit: Int
    $categorySlug: String
  ) {
    category(slug: $categorySlug) {
      ...CategoryDetailCommonField
    }
    confessions(offset: $offset, limit: $limit, categorySlug: $categorySlug) {
      ...ConfessionDetailCommonField
    }
    categories(limit: $categoryLimit, offset: 0) {
      ...CategoryDetailCommonField
    }
  }
  ${CONFESSION_DETAIL_DATA}
  ${CATEGORY_DETAIL_DATA}
`;

const Category = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data, fetchMore } = useQuery(GET_DATA, {
    variables: {
      offset: 0,
      limit: 10,
      categoryLimit: LIMIT_CATEGORY_FETCH,
      categorySlug: slug,
    },
  });
  const categoryID =
    data && data.category && data.category.id ? data.category.id : undefined;
  useViewTracking(-categoryID);

  const fetchMoreConfession = (e) => {
    return fetchMore({
      variables: {
        offset: data.confessions.length,
        categorySlug: slug,
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

  const { confessions, categories, category } = data;

  return (
    <>
      <CategorySEO category={category} />
      <div style={{ margin: '30px 0 30px 0' }}>
        <section className={'main-content'}>
          <h1 className={'cat-name'}>Tag: {category.name}</h1>
          <ListShortConfessionInfo
            confessions={confessions}
            fetchMoreConfession={fetchMoreConfession}
            loading={loading}
          />
        </section>
        <aside className={'right-sidebar'}>
          <ListCategoryInTags categories={categories} />
        </aside>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default Category;
