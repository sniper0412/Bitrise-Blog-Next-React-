import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { camlizeKeysDeep } from '../utils';
import { PostType, AuthorType } from '../types';
import { fetchPosts, fetchAuthor } from '../services/butter';

import AuthorInfo from '../components/AuthorInfo';
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
