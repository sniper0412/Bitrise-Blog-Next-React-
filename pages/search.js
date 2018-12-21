import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { camlizeKeysDeep } from '../utils';
import { PostType } from '../types';
import { searchPosts } from '../services/butter';
import { ROUTE_PATHS } from '../config';

import MetaTags from '../components/MetaTags';
import Hero from '../components/Hero';
import TryBitrise from '../components/TryBitrise';
import PostSummary from '../components/PostSummary';

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    query: PropTypes.string.isRequired
  };

  static async getInitialProps({ query: queryParams }) {
    const { q: query } = queryParams;

    const {
      data: { data: posts }
    } = await searchPosts({ query });

    return {
      posts: posts.map(camlizeKeysDeep),
      query
    };
  }

  getPosts() {}

  render() {
    const { posts, query } = this.props;

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
