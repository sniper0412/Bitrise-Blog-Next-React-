import React from 'react';
import PropTypes from 'prop-types';

import { PostType } from '../types';
import { formatDate } from '../utils';

const PostSummary = ({ slug, title, summary, categories = [], published, featuredImage, defaultImagePath }) => (
  <div className="article-container" key={slug}>
    <a href={`/post/${slug}`} title={title}>
      <div className="header-container">
        {categories.length > 0 && <p className="category">{categories[0].name}</p>}
        <p className="date">{formatDate(published)}</p>
      </div>

      <div className="image-container" style={{ backgroundImage: `url(${featuredImage || defaultImagePath})` }} />

      <div className="article">
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>
    </a>
  </div>
);

PostSummary.propTypes = { ...PostType, defaultImagePath: PropTypes.string.isRequired };

export default PostSummary;
