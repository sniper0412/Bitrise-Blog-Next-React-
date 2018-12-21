import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { camlizeKeysDeep } from '../utils';
import { PostType } from '../types';
import { searchPosts } from '../services/butter';
import { ROUTE_PATHS } from '../config';

import MetaTags from '../components/MetaTags';
import Hero from '../components/Hero';
import TryBitrise from '../components/TryBitrise';
import PostList from '../components/PostList';

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    query: PropTypes.string.isRequired,
    postCount: PropTypes.number
  };

  static async getInitialProps({ query: queryParams }) {
    const { q: query } = queryParams;

    const {
      data: {
        data: posts,
        meta: { count: postCount }
      }
    } = await searchPosts({ query });

    return {
      posts: posts.map(camlizeKeysDeep),
      postCount,
      query
    };
  }

  render() {
    const { posts, query, postCount } = this.props;

    return (
      <Fragment>
        <MetaTags
          title={`Results for '${query}'`}
          ogTitle={`Results for '${query}'`}
          url={`${ROUTE_PATHS.search}?q=${query}`}
        />

        <Hero />

        <div className="category-content">
          <div className="category-header">
            <h2>
              Results for '<span className="category-name">{query}</span>'
            </h2>
          </div>

          <PostList initialPosts={posts} count={postCount} filters={{ query }} />
        </div>
        <TryBitrise />
      </Fragment>
    );
  }
}
