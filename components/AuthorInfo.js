import React from 'react';
import PropTypes from 'prop-types';

import { AuthorType } from '../types';
import { ROUTE_PATHS } from '../config';

const AuthorInfo = ({ isBanner = false, slug, firstName, lastName, profileImage, title }) => (
  <div className={isBanner ? 'author-header-container' : 'author-info-container'}>
    {isBanner && <div className="all-articles">all articles by</div>}
    <div className="author-info">
      <div className="author-container">
        <img alt={`${firstName} ${lastName} avatar`} src={profileImage || '/static/svg/default_avatar.svg'} />
        <div className="name-and-title">
          <a href={`${ROUTE_PATHS.authors}/${slug}`}>
            {firstName} {lastName}
          </a>
          {title && <p>{title}</p>}
        </div>
      </div>
    </div>
  </div>
);

AuthorInfo.propTypes = {
  ...AuthorType,
  isBanner: PropTypes.bool
};

export default AuthorInfo;
