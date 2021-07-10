import { NextSeo } from 'next-seo';

const CategorySEO = ({ category }) => {
  const url = `https://confession.vn/category/${category.slug}/`;

  return (
    <NextSeo
      title={`${category.name} tag`}
      description={`Tập hợp các confession từ ${category.name}`}
      canonical={url}
      openGraph={{
        url: url,
        type: 'object',
        images: [
          {
            url: category.image,
            secure_url: category.image,
            alt: category.name,
          },
        ],
      }}
    />
  );
};

export default CategorySEO;
