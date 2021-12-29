const { createWriteStream } = require('fs');
const { resolve } = require('path');
const { createGzip } = require('zlib');
const { SitemapAndIndexStream, SitemapStream } = require('sitemap');

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
      LEFT JOIN app_public.category ct ON ct.id = cc.category_id and ct.deleted_at is null
    GROUP BY
      cc.confession_id) s ON s.confession_id = c.id
WHERE
  c.deleted_at is null
ORDER BY
  c.id DESC
      `,
      []
    )
  );

  return rows.map((cfs) => {

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
      news: undefined,
      changefreq: 'weekly',
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
        WHERE
          c.deleted_at IS NULL
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

      const fileName = `sitemap-${i}.xml.gz`;

      sitemapStream
        .pipe(createGzip()) // compress the output of the sitemap
        .pipe(createWriteStream(resolve(`${basePath}/${fileName}`)));

      return [
        new URL(fileName, 'https://confession.vn/').toString(),
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
