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
import PostSummary from '../components/PostSummary';

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    category: PropTypes.shape(CategoryType)
  };

  static async getInitialProps({ query }) {
    const { slug } = query;

    const [
      {
        data: { data: posts }
      },
      category
    ] = await Promise.all([fetchPosts({ categorySlug: slug }), fetchCategory({ slug })]);

    return {
      posts: posts.map(camlizeKeysDeep),
      category
    };
  }

  getPosts() {}

  render() {
    const { posts, category } = this.props;

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
