import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Butter from 'buttercms';
import Head from 'next/head';
import upperFirst from 'lodash/upperFirst';

import { fetchAuthor } from '../services/butter';
import { camlizeKeysDeep, parseMetaDescription, formatDate } from '../utils';
import { PostType } from '../types';
import { ROUTE_PATHS } from '../config';

import MetaTags from '../components/MetaTags';
import AuthorList from '../components/AuthorList';
import SocialIcons from '../components/SocialIcons';
import TryBitrise from '../components/TryBitrise';

export default class extends React.Component {
  static propTypes = {
    post: PropTypes.shape(PostType),
    metaDescription: PropTypes.string,
    enableDisqus: PropTypes.bool
  };

  static async getInitialProps({ query }) {
    const butter = Butter(process.env.BUTTER_TOKEN);
    const {
      data: { data: rawPost }
    } = await butter.post.retrieve(query.slug);
    const post = camlizeKeysDeep(rawPost);

    const { metaDescription, authors: authorSlugs } = parseMetaDescription(post.metaDescription);

    const otherAuthors = await Promise.all(
      authorSlugs.map(slug => fetchAuthor({ slug }).then(author => camlizeKeysDeep(author)))
    );

    return {
      post,
      authors: [post.author, ...otherAuthors],
      metaDescription,
      enableDisqus: process.env.NODE_ENV === 'production'
    };
  }

  render() {
    const { post, authors, metaDescription, enableDisqus } = this.props;

    return (
      <Fragment>
        <MetaTags
          title={post.seoTitle}
          description={metaDescription}
          image={post.featuredImage}
          url={`${ROUTE_PATHS.posts}/${post.slug}`}
        />
        <Head>
          {enableDisqus && <script src="//concretebuilder.disqus.com/embed.js" type="text/javascript" async />}
        </Head>
        <div className="post-content">
          <AuthorList authors={authors} />

          <h1 className="post-title">{post.title}</h1>
          <div className="publish-date-and-tags">
            <p className="publish-date">{formatDate(post.published)}</p>
            {post.categories.map(({ slug, name }) => (
              <Fragment key={slug}>
                <p className="divider-slash">/</p>
                <a className="category-element" href={`${ROUTE_PATHS.categories}/${slug}`}>
                  {upperFirst(name)}
                </a>
              </Fragment>
            ))}

            {post.tags.map(({ slug, name }) => (
              <Fragment key={slug}>
                <p className="divider-slash">/</p>
                <a className="category-element tag-element" href={`${ROUTE_PATHS.tags}/${slug}`}>
                  {upperFirst(name)}
                </a>
              </Fragment>
            ))}
          </div>
          <div className="post-featured-image">
            <img src={post.featuredImage} alt={post.title} />
          </div>
          <div className="post-body-wrapper">
            <SocialIcons vertical postTitle={post.title} />
            <div className="post-body">
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          </div>
          <SocialIcons postTitle={post.title} />
          {enableDisqus && <div id="disqus_thread" className="disqus-container" />}
        </div>
        <TryBitrise />
      </Fragment>
    );
  }
}
