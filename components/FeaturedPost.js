import React from 'react';
import SVG from 'react-inlinesvg';

import { ROUTE_PATHS } from '../config';
import { PostType } from '../types';
import { formatDate } from '../utils';

const FeaturedPost = ({ slug, title, featuredImage, categories, published, summary }) => (
  <div className="featured-article">
    <div className="article-container">
      <a href={`/post/${slug}`}>
        <div className="image-container" style={{ backgroundImage: `url(${featuredImage})` }} />
      </a>

      <div className="article">
        <div className="article-categories">
          <a href="/tags/featured">
            <p className="category tag">featured</p>
          </a>
          {categories.map(({ name, slug }) => (
            <a className="category" key={slug} href={`${ROUTE_PATHS.categories}/${slug}`}>
              {name}
            </a>
          ))}
        </div>

        <h2>
          <a href={`/posts/${slug}`}>{title}</a>
        </h2>
        <h3>Published on {formatDate(published)}</h3>
        <p>{summary}</p>

        <div className="default-button more">
          <a className="read-more" title="read more..." href={`${ROUTE_PATHS.posts}/${slug}`}>
            <div className="button-content-wrapper">
              <span>Read more</span>
              <SVG src="/static/svg/right_arrow.svg" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
);

FeaturedPost.propTypes = PostType;

export default FeaturedPost;
