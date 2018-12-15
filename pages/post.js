import React from 'react';
import Butter from 'buttercms';
import Head from 'next/head';

import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';

import AuthorInfo from '../components/AuthorInfo';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const butter = Butter(process.env.BUTTER_TOKEN);
    const {
      data: { data: post }
    } = await butter.post.retrieve(query.slug);

    return { post };
  }

  render() {
    const { post } = this.props;

    const author = mapKeys(post.author, (_, key) => camelCase(key));

    return (
      <div className="post-content">
        <Head>
          <title>{post.seo_title}</title>
          <meta name="description" content={post.meta_description} />
          <meta name="og:image" content={post.featured_image} />
        </Head>

        <AuthorInfo {...author} />

        <h1 className="post-title">{post.title}</h1>
        <div className="publish-date-and-tags">{/* content */}</div>
        <div className="post-featured-image">
          <img src={post.featured_image} alt={post.title} />
        </div>
        <div className="post-body-wrapper">
          <div className="share-article-vertical" />
          <div className="post-body">
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
        </div>
      </div>
    );
  }
}
