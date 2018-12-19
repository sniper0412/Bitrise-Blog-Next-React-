const Butter = require('buttercms');

const butter = () => Butter(process.env.BUTTER_TOKEN);

const fetchPosts = ({ page = 1, pageSize = 6, tagSlug, categorySlug, excludeBody = true } = {}) =>
  butter().post.list({
    page,
    page_size: pageSize,
    tag_slug: tagSlug,
    category_slug: categorySlug,
    exclude_body: excludeBody
  });

const fetchCategory = ({ slug }) => butter().category.retrieve(slug);

module.exports = {
  fetchPosts,
  fetchCategory
};
