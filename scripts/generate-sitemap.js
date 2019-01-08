require('dotenv').config();
const { createSitemap } = require('sitemap');
const { writeFileSync } = require('fs');
const Butter = require('buttercms');
const flattenDepth = require('lodash/flattenDepth');

const butter = () => Butter(process.env.BUTTER_TOKEN);

const allPosts = async () => {
  const page_size = 100; // ButterCMS limit is 100
  const butter = Butter(process.env.BUTTER_TOKEN);

  let {
    data: { data: list, meta }
  } = await butter.post.list({ page_size, page: 1 });

  if (!meta.next_page) {
    return list;
  }

  const promiseCount = Math.ceil((meta.count - page_size) / page_size);

  const promises = Array.from({ length: promiseCount }, (_, idx) =>
    butter.post.list({ page_size, page: idx + 2 }).then(({ data: { data: list } }) => list)
  );

  return list.concat(...(await Promise.all(promises)));
};

const allPostUrls = async () => {
  const posts = await allPosts();

  return posts
    .filter(({ slug }) => !!slug)
    .map(({ slug, published }) => ({
      url: `/posts/${slug}`,
      lastmodISO: published,
      changefreq: 'daily',
      priority: 0.9
    }));
};

const allAuthorUrls = async () => {
  const {
    data: { data: authors }
  } = await butter().author.list();

  return authors
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => ({
      url: `/authors/${slug}`,
      changefreq: 'monthly',
      priority: 0.8
    }));
};

const allTagUrls = async () => {
  const {
    data: { data: tags }
  } = await butter().tag.list();

  return tags
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => ({
      url: `/tags/${slug}`,
      changefreq: 'monthly',
      priority: 0.7
    }));
};

const allCategoryUrls = async () => {
  const {
    data: { data: categories }
  } = await butter().category.list();

  return categories
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => ({
      url: `/categories/${slug}`,
      changefreq: 'monthly',
      priority: 0.6
    }));
};

const generateResourceUrls = async () => {
  const urls = await Promise.all([allPostUrls(), allAuthorUrls(), allTagUrls(), allCategoryUrls()]);

  return flattenDepth(urls, 2);
};

const generateSitemap = async () => {
  const sitemap = createSitemap({
    hostname: 'https://blog.bitrise.io',
    // cacheTime: 600000, // 600 sec - cache purge period
    urls: [
      {
        url: '',
        priority: 1,
        changefreq: 'always'
      },
      ...(await generateResourceUrls()),
      {
        url: '/rss',
        priority: 0.5,
        changefreq: 'weekly'
      },
      {
        url: '/atom',
        priority: 0.5,
        changefreq: 'weekly'
      }
    ]
  });

  return sitemap;
};

console.time('done');
generateSitemap().then(sitemap => {
  const filepath = process.argv[2] || '/tmp/sitemap.xml';
  writeFileSync(filepath, sitemap.toString());

  console.timeEnd('done');
  console.log(`Sitemap saved to ${filepath}`);
});
