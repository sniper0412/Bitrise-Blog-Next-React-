import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

import { camlizeKeysDeep } from '../utils';
import { PostType, CategoryType } from '../types';
import { fetchPosts, fetchTag } from '../services/butter';
import { ROUTE_PATHS } from '../config';

import MetaTags from '../components/MetaTags';
import Hero from '../components/Hero';
import TryBitrise from '../components/TryBitrise';
import PostList from '../components/PostList';

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    category: PropTypes.shape(CategoryType),
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
      tag
    ] = await Promise.all([fetchPosts({ tagSlug: slug }), fetchTag({ slug })]);

    return {
      posts: posts.map(camlizeKeysDeep),
      tag,
      postCount
    };
  }

  getPosts() {}

  render() {
    const { posts, tag, postCount } = this.props;

    return (
      <Fragment>
        <MetaTags
          title={capitalize(tag.name)}
          ogTitle={`Bitrise Blog - Posts tagged as ${capitalize(tag.name)}`}
          url={`${ROUTE_PATHS.tags}/${tag.slug}`}
        />

        <Hero />

        <div className="category-content">
          <div className="category-header">
            <h2>
              Articles tagged as <span className="category-name">{tag.name}</span>
            </h2>
          </div>

          <PostList initialPosts={posts} count={postCount} filters={{ tagSlug: tag.slug }} />
        </div>
        <TryBitrise />
      </Fragment>
    );
  }
}
