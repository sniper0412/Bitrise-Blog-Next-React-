import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

import { ROUTE_PATHS } from '../config';

const Category = ({ data: { slug, name } }) => (
  <a href={`${ROUTE_PATHS.categories}/${slug}`} title={name} className="category">
    {name}
  </a>
);

export default class SubNav extends React.Component {
  state = {
    isDropDownOpen: false
  };

  onSelectCategory() {
    this.setState({ isDropDownOpen: !this.state.isDropDownOpen });
  }

  static defaultProps = {
    categories: []
  };

  render() {
    const { categories } = this.props;
    const { isDropDownOpen } = this.state;

    const searchForm = (
      <form action="/search" className="search-wrapper">
        <SVG src="/static/svg/search.svg" />
        <input name="q" type="text" placeholder="Search articles" />
      </form>
    );

    return (
      <div className="categories">
        <div className="category-select-wrapper" onClick={() => this.onSelectCategory()}>
          <SVG src="/static/svg/filter.svg" />
          <button className="category-select-mobile category-select">filter by category</button>
          <div className={cx('dropdown-arrow-container', isDropDownOpen ? 'opened' : 'closed')}>
            <SVG src="/static/svg/dropdown_arrow.svg" />
          </div>
        </div>
        <div className={cx('content-wrapper', { opened: isDropDownOpen })}>
          <div className="search-mobile">{searchForm}</div>
          <a href="/" title="Home" className="category home">
            <SVG src="/static/svg/home_button.svg" />
            <span>Home</span>
          </a>
          {categories.map(category => (
            <Category data={category} key={category.slug} />
          ))}
          <div className="search-container desktop">{searchForm}</div>
        </div>
      </div>
    );
  }
}
