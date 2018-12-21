import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { camlizeKeysDeep } from '../utils';
import { PostType, AuthorType } from '../types';
import { fetchPosts, fetchAuthor } from '../services/butter';
import { ROUTE_PATHS } from '../config';

import MetaTags from '../components/MetaTags';
import AuthorInfo from '../components/AuthorInfo';
import TryBitrise from '../components/TryBitrise';
import PostSummary from '../components/PostSummary';

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    author: PropTypes.shape(AuthorType)
  };

  static async getInitialProps({ query }) {
    const { slug } = query;

    const [
      {
        data: { data: posts }
      },
      author
    ] = await Promise.all([fetchPosts({ authorSlug: slug }), fetchAuthor({ slug })]);

    return {
      posts: posts.map(camlizeKeysDeep),
      author: camlizeKeysDeep(author)
    };
  }

  getPosts() {}

  render() {
    const { posts, author } = this.props;
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
          <div id="articles-container" className="articles">
            {posts.map((post, key) => (
              <PostSummary key={key} {...post} defaultImagePath="/static/img/post-default-img.jpg" />
            ))}
          </div>
        </div>

        <TryBitrise />
      </Fragment>
    );
  }
}
