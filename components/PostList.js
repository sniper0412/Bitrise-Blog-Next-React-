import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';
import { format } from 'url';

import { PostType } from '../types';

import PostSummary from './PostSummary';
import { camlizeKeysDeep } from '../utils';

export default class PostList extends React.Component {
  static propTypes = {
    initialPosts: PropTypes.arrayOf(PropTypes.shape(PostType)),
    count: PropTypes.number.isRequired,
    filters: PropTypes.shape({
      tagSlug: PropTypes.string,
      categorySlug: PropTypes.string,
      authorSlug: PropTypes.string,
      query: PropTypes.string
    })
  };

  state = {
    page: 2, // Butter page count starts at 1, the first page is loaded by the server
    isLoading: false,
    posts: []
  };

  async loadMorePosts() {
    const { filters } = this.props;
    const { page, isLoading } = this.state;
    if (isLoading) return;

    this.setState({ isLoading: true });

    const url = format({
      pathname: '/fetch-posts',
      query: { ...mapKeys(filters, (_, key) => snakeCase(key)), page }
    });

    const posts = (await fetch(url).then(res => res.json())).map(camlizeKeysDeep);

    this.setState({ isLoading: false, page: page + 1, posts: this.state.posts.concat(posts) });
  }

  render() {
    const { count, initialPosts } = this.props;
    const { posts } = this.state;

    const allPosts = [...initialPosts, ...posts];

    return (
      <Fragment>
        <div className="articles">
          {allPosts.map((post, key) => (
            <PostSummary key={key} {...post} defaultImagePath="/static/img/post-default-img.jpg" />
          ))}
        </div>

        {count > allPosts.length && (
          <div className="default-button load-more" onClick={() => this.loadMorePosts()}>
            <span className="default-button__content">Load more</span>
          </div>
        )}
      </Fragment>
    );
  }
}
