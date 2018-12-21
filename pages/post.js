import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Butter from 'buttercms';
import Head from 'next/head';
import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';

import { camlizeKeysDeep } from '../utils';
import { PostType } from '../types';
import { ROUTE_PATHS } from '../config';

import MetaTags from '../components/MetaTags';
import AuthorInfo from '../components/AuthorInfo';
import TryBitrise from '../components/TryBitrise';

export default class extends React.Component {
  static propTypes = {
    post: PropTypes.shape(PostType),
    enableDisqus: PropTypes.bool
  };

  static async getInitialProps({ query }) {
    const butter = Butter(process.env.BUTTER_TOKEN);
    const {
      data: { data: post }
    } = await butter.post.retrieve(query.slug);

    return { post: camlizeKeysDeep(post), enableDisqus: process.env.NODE_ENV === 'production' };
  }
  render() {
    const { post, enableDisqus } = this.props;

    const author = mapKeys(post.author, (_, key) => camelCase(key));

    return (
      <Fragment>
        <MetaTags
          title={post.seoTitle}
          description={post.metaDescription}
          image={post.featuredImage}
          url={`${ROUTE_PATHS.posts}/${post.slug}`}
        />
        <Head>
          {enableDisqus && <script src="//concretebuilder.disqus.com/embed.js" type="text/javascript" async />}
        </Head>
        <div className="post-content">
          <h1>{}</h1>
          <AuthorInfo {...author} />

          <h1 className="post-title">{post.title}</h1>
          <div className="publish-date-and-tags">{/* content */}</div>
          <div className="post-featured-image">
            <img src={post.featuredImage} alt={post.title} />
          </div>
          <div className="post-body-wrapper">
            <div className="share-article-vertical" />
            <div className="post-body">
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          </div>
        </div>
        {enableDisqus && <div id="disqus_thread" className="disqus-container" />}
        <TryBitrise />
      </Fragment>
    );
  }
}
