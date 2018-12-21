import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { camlizeKeysDeep } from '../utils';
import { fetchPosts } from '../services/butter';
import { PostType } from '../types';

import MetaTags from '../components/MetaTags';
import FeaturedPost from '../components/FeaturedPost';
import Hero from '../components/Hero';
import TryBitrise from '../components/TryBitrise';
import PostSummary from '../components/PostSummary';

const FEATURED_TAG = 'featured';

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType))
  };

  static async getInitialProps({ query }) {
    const [
      {
        data: { data: posts }
      },
      {
        data: {
          data: [featuredPost]
        }
      }
    ] = await Promise.all([fetchPosts(), fetchPosts({ tagSlug: FEATURED_TAG, pageSize: 1 })]);

    return {
      posts: posts.map(camlizeKeysDeep),
      featuredPost: camlizeKeysDeep(featuredPost)
    };
  }

  getPosts() {}

  render() {
    const {
      featuredPost,
      posts
      // meta: { next_page, previous_page }
    } = this.props;

    return (
      <Fragment>
        <MetaTags />
        <Hero />

        <div className="content-wrapper">
          <FeaturedPost {...featuredPost} />

          <h2>Recent articles</h2>

          <div id="articles-container" className="articles">
            {posts.map((post, key) => (
              <PostSummary key={key} {...post} defaultImagePath="/static/img/post-default-img.jpg" />
            ))}
          </div>
          {/* <a href={`/post/${post.slug}`}>{post.title}</a> */}

          {/* <div>
            {previous_page && (
              <Link href={`/?page=${previous_page}`}>
                <a>Prev</a>
              </Link>
            )}

            {next_page && (
              <Link href={`/?page=${next_page}`}>
                <a>Next</a>
              </Link>
            )}
          </div> */}
        </div>
        <TryBitrise />
      </Fragment>
    );
  }
}
