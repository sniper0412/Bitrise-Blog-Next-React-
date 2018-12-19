const Butter = require('buttercms');

const butter = () => Butter(process.env.BUTTER_TOKEN);

const fetchPosts = ({ page = 1, pageSize = 6, tagSlug, categorySlug, authorSlug, excludeBody = true } = {}) =>
  butter().post.list({
    page,
    page_size: pageSize,
    tag_slug: tagSlug,
    category_slug: categorySlug,
    author_slug: authorSlug,
    exclude_body: excludeBody
  });

const fetchCategory = ({ slug }) => butter().category.retrieve(slug);
const fetchAuthor = ({ slug }) => butter().author.retrieve(slug);

module.exports = {
  fetchPosts,
  fetchCategory,
  fetchAuthor
};
