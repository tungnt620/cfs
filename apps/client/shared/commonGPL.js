import { gql } from "apollo-boost";

export const CONFESSION_DETAIL_DATA = gql`
  fragment ConfessionDetailCommonField on Confession {
    id
    created_at
    slug
    image
    thumbnail
    title
    totalComment
    categories {
      slug
      name
    }
  }
`;

export const CATEGORY_DETAIL_DATA = gql`
  fragment CategoryDetailCommonField on Category {
    id
    slug
    name
    image
  }
`;
