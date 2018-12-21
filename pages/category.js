import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

import { camlizeKeysDeep } from '../utils';
import { PostType, CategoryType } from '../types';
import { fetchPosts, fetchCategory } from '../services/butter';
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
      category
    ] = await Promise.all([fetchPosts({ categorySlug: slug }), fetchCategory({ slug })]);

    return {
      posts: posts.map(camlizeKeysDeep),
      postCount,
      category
    };
  }

  render() {
    const { posts, category, postCount } = this.props;

    return (
      <Fragment>
        <MetaTags
          title={capitalize(category.name)}
          ogTitle={`Bitrise Blog - Posts in ${capitalize(category.name)}`}
          url={`${ROUTE_PATHS.categories}/${category.slug}`}
        />

        <Hero />

        <div className="category-content">
          <div className="category-header">
            <h2>
              Articles for <span className="category-name">{category.name}</span>
            </h2>
          </div>

          <PostList initialPosts={posts} count={postCount} filters={{ categorySlug: category.slug }} />
        </div>
        <TryBitrise />
      </Fragment>
    );
  }
}
