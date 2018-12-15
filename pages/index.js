import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { PostType } from '../types';
import FeaturedPost from '../components/FeaturedPost';
import Hero from '../components/Hero';
import TryBitrise from '../components/TryBitrise';

import { camlizeKeysDeep } from '../utils';
import { fetchPosts } from '../services/posts';
import PostSummary from '../components/PostSummary';

const FEATURED_TAG = 'featured';
const META = {
  title: 'Bitrise Blog - Mobile Continuous Integration and Delivery',
  description:
    'Bitrise Blog - Mobile Continuous Integration and Delivery for your whole team, with dozens of integrations for your favourite services.'
};

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
        <Head>
          <title>{META.title}</title>
          <meta name="description" content={META.description} />
          <meta property="fb:app_id" content="649161285439710" />
          <meta property="og:title" content={META.title} />
          <meta property="og:description" content={META.description} />
          <meta property="og:url" content="https://blog.bitrise.io/<%= content_for(:canonical_url) %>" />
          <meta property="og:site_name" content="Bitrise Blog" />
          <meta property="og:type" content="article" />
          <meta property="og:image" content="https://www.bitrise.io/assets/placeholders/website-social-embed.png" />
          <meta property="og:image:width" content="1910" />
          <meta property="og:image:height" content="1000" />
        </Head>
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
