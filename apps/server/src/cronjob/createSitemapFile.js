const { createSitemapsAndIndex } = require("sitemap");

async function generateSitemap() {
  // Initial database
  const Database = require("better-sqlite3");
  const db = new Database("/home/deploy/confession_v2.db");
  // const db = new Database(process.env.DB_URL)

  // set up any dataSources our resolvers need
  const Confession = require("../datasources/confession");
  const confessionDatasource = new Confession(db);

  const confessionSlugs = await confessionDatasource.getAllPublicConfessionSlug();
  const categorySlugs = await confessionDatasource.getAllCategorySlug();

  const urls = [];
  for (let i = 0; i < confessionSlugs.length; ++i) {
    const slugObj = confessionSlugs[i];
    urls.push({
      url: `https://confession.vn/${slugObj.slug}/`,
      changefreq: "weekly",
      priority: "0.8"
    });
  }

  for (let i = 0; i < categorySlugs.length; ++i) {
    const slugObj = categorySlugs[i];
    urls.push({
      url: `https://confession.vn/category/${slugObj.slug}/`,
      changefreq: "daily",
      priority: "0.8"
    });
  }

  createSitemapsAndIndex({
    urls,
    targetFolder: "../../client/static/rootFiles/",
    hostname: "https://confession.vn",
    sitemapName: "sitemap",
    sitemapSize: 50000, // number of urls to allow in each sitemap
    gzip: true // whether to gzip the files
  });
}

generateSitemap();
