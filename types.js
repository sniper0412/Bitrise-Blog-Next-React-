import PropTypes from 'prop-types';

export const AuthorType = {
  slug: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  title: PropTypes.string,
  bio: PropTypes.string
};

export const CategoryType = {
  slug: PropTypes.string,
  name: PropTypes.string
};

export const PostType = {
  author: PropTypes.shape(AuthorType),
  slug: PropTypes.string,
  seoTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  featuredImage: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.shape(CategoryType)),
  tags: PropTypes.array,
  summary: PropTypes.string

  // 'url',
  // 'created',
  // 'published',
  // 'status'
};
