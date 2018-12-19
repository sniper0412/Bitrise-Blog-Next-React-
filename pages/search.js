import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { camlizeKeysDeep } from '../utils';
import { PostType } from '../types';
import { searchPosts } from '../services/butter';

import Hero from '../components/Hero';
import TryBitrise from '../components/TryBitrise';
import PostSummary from '../components/PostSummary';

const META = {
  title: 'Bitrise Blog - Mobile Continuous Integration and Delivery',
  description:
    'Bitrise Blog - Mobile Continuous Integration and Delivery for your whole team, with dozens of integrations for your favourite services.'
};

export default class extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    query: PropTypes.string.isRequired
  };

  static async getInitialProps({ query }) {
    const { q } = query;

    const {
      data: { data: posts }
    } = await searchPosts({ query: q });

    return {
      posts: posts.map(camlizeKeysDeep),
      query: q
    };
  }

  getPosts() {}

  render() {
    const { posts, query } = this.props;

    const title = `Results for '${query}' | Bitrise Blog`;

    return (
      <Fragment>
        <Head>
          <title>{title}</title>
          <meta name="description" content={META.description} />
          <meta property="fb:app_id" content="649161285439710" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={META.description} />
          <meta property="og:url" content="https://blog.bitrise.io/<%= content_for(:canonical_url) %>" />
          <meta property="og:site_name" content="Bitrise Blog" />
          <meta property="og:type" content="article" />
          <meta property="og:image" content="https://www.bitrise.io/assets/placeholders/website-social-embed.png" />
          <meta property="og:image:width" content="1910" />
          <meta property="og:image:height" content="1000" />
        </Head>
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
