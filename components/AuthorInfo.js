import React from 'react';
import PropTypes from 'prop-types';

// TODO: image_path('blog_default_avatar')
const AuthorInfo = ({ slug, firstName, lastName, profileImage, title }) => (
  <div className="author-info-container">
    <div className="author-info">
      <div className="author-container">
        <img alt={`${firstName} ${lastName} avatar`} src={profileImage} />
        <div className="name-and-title">
          <a href={`/author/${slug}`}>
            {firstName} {lastName}
          </a>
          {title && <p>{title}</p>}
        </div>
      </div>
    </div>
  </div>
);

AuthorInfo.propTypes = {
  slug: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default AuthorInfo;
