import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { camlizeKeysDeep } from '../utils';
import { fetchPosts } from '../services/butter';
import { PostType } from '../types';

import MetaTags from '../components/MetaTags';
import FeaturedPost from '../components/FeaturedPost';
import Hero from '../components/Hero';
import TryBitrise from '../components/TryBitrise';
import PostList from '../components/PostList';

const FEATURED_TAG = 'featured';

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    featuredPost: PropTypes.shape(PostType),
    postCount: PropTypes.number
  };

  static async getInitialProps({ query }) {
    const [
      {
        data: {
          data: posts,
          meta: { count: postCount }
        }
      },
      {
        data: {
          data: [featuredPost]
        }
      }
    ] = await Promise.all([fetchPosts(), fetchPosts({ tagSlug: FEATURED_TAG, pageSize: 1 })]);

    return {
      posts: posts.map(camlizeKeysDeep),
      featuredPost: camlizeKeysDeep(featuredPost),
      postCount
    };
  }

  render() {
    const { posts, featuredPost, postCount } = this.props;

    var iframeStyle = {
      display: 'none',
      visibility: 'hidden'
    };
    
    return (
      <Fragment>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZK32GR"
        height="0" width="0" style={iframeStyle
        }></iframe></noscript>
        <MetaTags />
        <Hero />

        <div className="content-wrapper">
          <FeaturedPost {...featuredPost} />

          <h2>Recent articles</h2>

          <PostList initialPosts={posts} count={postCount} />
        </div>
        <TryBitrise />
      </Fragment>
    );
  }
}
