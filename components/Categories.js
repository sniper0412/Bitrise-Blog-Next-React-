import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

import { ROUTE_PATHS } from '../config';

const Category = ({ data: { slug, name } }) => (
  <a href={`${ROUTE_PATHS.categories}/${slug}`} title={name} className="category">
    {name}
  </a>
);

export default class Categories extends React.Component {
  state = {
    isDropDownOpen: false
  };

  componentDidMount() {
    // $('#searchKeyWord').keydown(function(e) {
    //   if (e.keyCode == 13) {
    //     window.location = `/posts/search?query=${$('#searchKeyWord').val()}`;
    //   }
    // });
    // $('#searchKeyWordMobile').keydown(function(e) {
    //   if (e.keyCode == 13) {
    //     window.location = `/posts/search?query=${$(
    //       '#searchKeyWordMobile'
    //     ).val()}`;
    //   }
    // });
  }

  onSelectCategory() {
    this.setState({ isDropDownOpen: !this.state.isDropDownOpen });
  }

  render() {
    const { categories } = this.props;
    const { isDropDownOpen } = this.state;

    return (
      // <% environment.context_class.instance_eval { include ApplicationHelper } %>
      <div className="categories">
        <div className="category-select-wrapper" onClick={() => this.onSelectCategory()}>
          <SVG src="/static/svg/filter.svg" />
          <button className="category-select-mobile category-select">filter by category</button>
          <div className={cx('dropdown-arrow-container', isDropDownOpen ? 'opened' : 'closed')}>
            <SVG src="/static/svg/dropdown_arrow.svg" />
          </div>
        </div>
        <div className={cx('content-wrapper', { opened: isDropDownOpen })}>
          <div className="search-mobile">
            <div className="search-wrapper">
              <SVG src="/static/svg/search.svg" />
              <input id="searchKeyWordMobile" name="searchKeyWordMobile" type="text" placeholder="Search articles..." />
            </div>
          </div>
          <a href="/" title="Home" className="category home">
            <SVG src="/static/svg/home_button.svg" />
            <span>Home</span>
          </a>
          {categories.map(category => (
            <Category data={category} key={category.name} />
          ))}
          <div className="search-container desktop">
            <div className="search-wrapper">
              <SVG src="/static/svg/search.svg" />
              <input id="searchKeyWord" name="searchKeyWord" type="text" placeholder="Search articles" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
