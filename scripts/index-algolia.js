require('dotenv').config();
const Algolia = require('algoliasearch');
const Butter = require('buttercms');
const html2text = require('html-to-text');

const { getAllButterPost } = require('./shared');

const butter = Butter(process.env.BUTTER_TOKEN);
const client = Algolia(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_KEY);

const postToAlgoliaObject = ({ title, url, slug, summary, body }) => ({
  objectID: slug,
  title,
  url,
  slug,
  summary,
  body: html2text
    .fromString(body, {
      ignoreImage: true,
      wordwrap: false,
      ignoreHref: true,
      uppercaseHeadings: false,
      singleNewLineParagraphs: true
    })
    .slice(0, 18000) // make sure the text is not too long, current Algolia limit is 20K/object
});

const reindexPosts = async () => {
  try {
    const posts = await getAllButterPost(butter);

    const objects = posts.map(postToAlgoliaObject);

    await index.saveObjects(objects);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

console.time('done');
reindexPosts().then(success => {
  console.timeEnd('done');

  if (success) {
    console.log('Updated index');
  } else {
    console.log('Failed to updated index');
  }
});
