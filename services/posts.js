const Butter = require('buttercms');

const fetchPosts = ({ page = 1, pageSize = 6, tagSlug, excludeBody = true } = {}) => {
  const butter = Butter(process.env.BUTTER_TOKEN);

  return butter.post.list({ page, page_size: pageSize, tag_slug: tagSlug, exclude_body: excludeBody });
};

module.exports = {
  fetchPosts
};
