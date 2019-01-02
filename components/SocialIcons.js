import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

export default class SocialIcons extends React.Component {
  static propTypes = {
    vertical: PropTypes.bool,
    postTitle: PropTypes.string
  };

  state = {
    fixed: false
  };

  componentDidMount() {
    document.body.addEventListener('scroll', this.update);
  }

  componentWillUnmount() {
    document.body.removeEventListener('scroll', this.update);
  }

  update = () => {
    const fixed = !this.isVisible('.post-featured-image img') && !this.isVisible('.share-article');
    const hidden =
      this.isVisible('.share-article') ||
      this.isVisible('.footer') ||
      this.isVisible('.try-wrapper') ||
      this.isVisible('.disqus-container');

    this.setState({
      fixed,
      hidden
    });
  };

  isVisible = selector => {
    const navBarHeight = 128;
    const element = document.querySelector(selector);
    if (!element) return false;

    const { y, height } = element.getBoundingClientRect();

    return y + height >= navBarHeight && y <= window.innerHeight;
  };

  openPopup = url => {
    window.open(url, 'pop', 'width=600, height=400, scrollbars=no');
  };

  render() {
    const { vertical, postTitle = '' } = this.props;
    const { fixed, hidden } = this.state;

    return (
      <div className={cx(vertical ? 'share-article-vertical' : 'share-article')}>
        <div
          className={cx('social-icons', {
            fixed,
            hidden
          })}
        >
          <h3>{vertical ? 'Share' : 'Share this article'}</h3>
          <button
            className="facebookShareButton"
            onClick={() => this.openPopup(`https://www.facebook.com/sharer/sharer.php?u=${window.location}`)}
          >
            <div className="fb-container">
              <SVG src="/static/svg/social_icons/facebook.svg" />
            </div>
          </button>
          <button
            className="twitterShareButton"
            onClick={() => this.openPopup(`https://twitter.com/share?url=${window.location}&text=${postTitle}`)}
          >
            <div className="twitter-container">
              <SVG src="/static/svg/social_icons/twitter.svg" />
            </div>
          </button>
          <button
            className="linkedInShareButton"
            onClick={() =>
              this.openPopup(
                `https://www.linkedin.com/shareArticle?mini=true&url=${window.location}&title=${postTitle}`
              )
            }
          >
            <div className="linkedin-container">
              <SVG src="/static/svg/social_icons/linkedin.svg" />
            </div>
          </button>
          <button
            className="yCombinatorShareButton"
            onClick={() => this.openPopup('https://news.ycombinator.com/submit')}
          >
            <div className="yc-container">
              <SVG src="/static/svg/social_icons/ycombinator.svg" />
            </div>
          </button>
        </div>
      </div>
    );
  }
}
