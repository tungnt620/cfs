import { NextSeo } from 'next-seo';

const ConfessionSEO = ({ confession = {}, categories }) => {
  const url = `https://confession.vn/${confession?.slug}/`;

  return (
    <NextSeo
      title={confession?.title}
      description={(confession?.content || '')
        .substr(0, 155)
        .trim()
        .replace(/[\n\r]/g, '')}
      canonical={url}
      openGraph={{
        url: url,
        type: 'article',
        images: confession?.image ? [
          {
            url: confession.image,
            secure_url: confession.image,
            alt: confession.title,
          },
        ] : [],
        article: {
          section: (categories || [])
            .map((cat) => cat.name)
            .join(', '),
          published_time: confession?.created_at,
        },
      }}
    />
  );
};

export default ConfessionSEO;
