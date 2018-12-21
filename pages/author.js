import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { camlizeKeysDeep } from '../utils';
import { PostType, AuthorType } from '../types';
import { fetchPosts, fetchAuthor } from '../services/butter';
import { ROUTE_PATHS } from '../config';

import MetaTags from '../components/MetaTags';
import AuthorInfo from '../components/AuthorInfo';
import TryBitrise from '../components/TryBitrise';
import PostList from '../components/PostList';

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    author: PropTypes.shape(AuthorType),
    postCount: PropTypes.number
  };

  static async getInitialProps({ query }) {
    const { slug } = query;

    const [
      {
        data: {
          data: posts,
          meta: { count: postCount }
        }
      },
      author
    ] = await Promise.all([fetchPosts({ authorSlug: slug }), fetchAuthor({ slug })]);

    return {
      posts: posts.map(camlizeKeysDeep),
      author: camlizeKeysDeep(author),
      postCount
    };
  }

  render() {
    const { posts, author, postCount } = this.props;
    const authorName = `${author.firstName} ${author.lastName}`;

    return (
      <Fragment>
        <MetaTags
          title={authorName}
          description={author.bio}
          ogTitle={`Bitrise Blog - All articles by ${authorName}`}
          url={`${ROUTE_PATHS.authors}/${author.slug}`}
          image={author.profileImage}
        />

        <AuthorInfo {...author} isBanner />

        <div className="author-content">
          <PostList initialPosts={posts} count={postCount} filters={{ authorSlug: author.slug }} />
        </div>

        <TryBitrise />
      </Fragment>
    );
  }
}
