import React from 'react';
import PropTypes from 'prop-types';

import { AuthorType } from '../types';
import { ROUTE_PATHS } from '../config';

const AuthorList = ({ isBanner = false, authors }) => (
  <div className={isBanner ? 'author-header-container' : 'author-info-container'}>
    {isBanner && <div className="all-articles">all articles by</div>}
    <div className="author-info">
      {authors.map(author => (
        <div key={author.slug} className="author-container">
          <img
            alt={`${author.firstName} ${author.lastName} avatar`}
            src={author.profileImage || '/static/svg/default_avatar.svg'}
          />
          <div className="name-and-title">
            <a href={`${ROUTE_PATHS.authors}/${author.slug}`}>
              {author.firstName} {author.lastName}
            </a>
            {author.title && <p>{author.title}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

AuthorList.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.shape(AuthorType)),
  isBanner: PropTypes.bool
};

export default AuthorList;
