import React from 'react';
import MainLayout from 'components/Layout';
import Header from 'components/Header';
import styles from '../shared/styles';
import { useRouter } from 'next/router';
import ConfessionDetail from '../ConfessionDetail';
import ListCategoryInTags from '../ListCategoryInTags';
import { gql } from 'apollo-boost';
import { CATEGORY_DETAIL_DATA } from '../../shared/commonGPL';
import { useQuery } from '@apollo/react-hooks';
import { useViewTracking } from '../../shared/hooks';
import ConfessionSEO from './helpers/seo/ConfessionSEO';

const GET_DATA = gql`
  query getData($slug: String) {
    confession(slug: $slug) {
      id
      slug
      title
      image
      totalComment
      categories {
        id
        slug
        name
      }
      content
      created_at
      comments {
        id
        author_name
        author
        content
        image
        parent
        created_at
      }
      relativeConfessions {
        id
        title
        slug
        totalComment
        created_at
      }
      relativeCategories {
        id
        slug
        name
      }
    }
    categories(limit: 100, offset: 0) {
      ...CategoryDetailCommonField
    }
  }
  ${CATEGORY_DETAIL_DATA}
`;
const Confession = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery(GET_DATA, {
    variables: {
      slug,
    },
  });
  const confessionID =
    data && data.confession && data.confession.id
      ? data.confession.id
      : undefined;

  useViewTracking(confessionID);

  if (loading) return 'Loading ...';
  if (error) return `Error! ${error.message}`;

  let { confession = {}, categories } = data || {};

  confession = confession || {};

  return (
    <>
      <ConfessionSEO confession={confession} />
      <div style={{ margin: '30px 0 30px 0' }}>
        <section className={'main-content'}>
          <ConfessionDetail confession={confession} />
        </section>
        <aside className={'right-sidebar'}>
          <ListCategoryInTags categories={categories} />
        </aside>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default Confession;
