const { createWriteStream } = require('fs');
const { resolve } = require('path');
const { createGzip } = require('zlib');
const { SitemapAndIndexStream, SitemapStream } = require('sitemap');
const dayjs = require('dayjs');

async function getConfessionLinks(withPgClient) {
  const { rows } = await withPgClient((pgClient) =>
    pgClient.query(
      `
SELECT
  slug,
  title,
  created_at,
  updated_at,
  image,
  s.category_names as category_names
FROM
  app_public.confession c
  LEFT JOIN (
    SELECT
      cc.confession_id,
      string_agg(ct.name, ', ') category_names
    FROM
      app_public.confession_category cc
      LEFT JOIN app_public.category ct ON ct.id = cc.category_id
    GROUP BY
      cc.confession_id) s ON s.confession_id = c.id
ORDER BY
  c.id DESC
      `,
      []
    )
  );

  return rows.map((cfs) => {
    const isNews = dayjs(cfs.created_at).add(2, 'day').isAfter(dayjs());

    return {
      url: `/${cfs.slug}/`,
      img: cfs.image
        ? [
            {
              url: cfs.image,
              caption: cfs.title,
              title: cfs.title,
              geoLocation: 'Vietnam',
              license: 'https://creativecommons.org/licenses/by/4.0/',
            },
          ]
        : [],
      news: isNews
        ? {
            publication: {
              name: 'Confession.vn',
              language: 'vi',
            },
            publication_date: dayjs(cfs.created_at).format('YYYY/MM/DD'),
            title: cfs.title,
            keywords: cfs.category_names,
            genres: 'Opinion',
          }
        : undefined,
      changefreq: 'daily',
      priority: 0.5,
      lastmod: cfs.updated_at,
    };
  });
}

async function getCategoryLinks(withPgClient) {
  const { rows } = await withPgClient((pgClient) =>
    pgClient.query(
      `
SELECT
  ct.slug,
  ct.image,
  ct.name,
  subquery.updated_at
FROM
  app_public.category ct
  LEFT JOIN (
    SELECT
      cc.category_id,
      c.updated_at
    FROM
      app_public.confession c
      INNER JOIN (
        SELECT
          category_id,
          max(confession_id) AS confession_id
        FROM
          app_public.confession_category
        GROUP BY
          category_id) AS cc ON c.id = cc.confession_id) subquery ON subquery.category_id = ct.id
      `,
      []
    )
  );

  return rows.map((cat) => {
    return {
      url: `/c/${cat.slug}/`,
      img: cat.image
        ? [
            {
              url: cat.image,
              caption: `Hình ảnh của danh mục confession ${cat.name}`,
              title: `Danh mục confession ${cat.name}`,
              geoLocation: 'Vietnam',
              license: 'https://creativecommons.org/licenses/by/4.0/',
            },
          ]
        : [],
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: cat.updated_at,
    };
  });
}

function getStaticLinks() {
  return [
    {
      url: `/`,
      changefreq: 'daily',
      priority: 0.8,
    },
  ];
}

module.exports = async (inPayload, { withPgClient, logger }) => {
  const categoryLinks = await getCategoryLinks(withPgClient);
  logger.info(`have ${categoryLinks.length} category links`);
  const cfsLinks = await getConfessionLinks(withPgClient);
  logger.info(`have ${cfsLinks.length} confession links`);
  const staticLinks = getStaticLinks();
  logger.info(`have ${staticLinks.length} static links`);

  generate([...staticLinks, ...categoryLinks, ...cfsLinks], logger);
};

const basePath = '../../../data/static'

function generate(urls, logger) {
  logger.info(`Total ${urls.length} links have for generate sitemap`);

  const sms = new SitemapAndIndexStream({
    limit: 45000, // defaults to 45k
    // SitemapAndIndexStream will call this user provided function every time
    // it needs to create a new sitemap file. You merely need to return a stream
    // for it to write the sitemap urls to and the expected url where that sitemap will be hosted
    getSitemapStream: (i) => {
      const sitemapStream = new SitemapStream({
        hostname: 'https://confession.vn',
        lastmodDateOnly: false, // defaults to false, flip to true for baidu
      });
      // if your server automatically serves sitemap.xml.gz when requesting sitemap.xml leave this line be
      // otherwise you will need to add .gz here and remove it a couple lines below so that both the index
      // and the actual file have a .gz extension
      const path = `./sitemap-${i}.xml.gz`;

      sitemapStream
        .pipe(createGzip()) // compress the output of the sitemap
        .pipe(createWriteStream(resolve(path))); // write it to sitemap-NUMBER.xml
      // .pipe(createWriteStream(resolve(path))); // write it to sitemap-NUMBER.xml

      return [
        new URL(path, 'https://confession.vn/').toString(),
        sitemapStream,
      ];
    },
  });

  sms
    .pipe(createGzip())
    .pipe(createWriteStream(resolve(`${basePath}/sitemap-index.xml.gz`)));

  urls.forEach((url) => {
    sms.write(url);
  });

  sms.end();

  logger.info('Generate success');
}
