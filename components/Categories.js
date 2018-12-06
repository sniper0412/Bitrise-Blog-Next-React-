import React from 'react';

const Category = ({ data: { path, name } }) => (
  <a href={path} title={name} className="category">
    {name}
  </a>
);

export default class Categories extends React.Component {
  state = {
    dropDownOpened: false
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
    const dropDownOpened = !this.state.dropDownOpened;
    this.setState({ dropDownOpened });
  }

  render() {

    const { categories } = this.props;

    return (
      // <% environment.context_class.instance_eval { include ApplicationHelper } %>
      <div className="categories">
        <div
          className="category-select-wrapper"
          onClick={() => this.onSelectCategory()}
        >
          {/* <%= svg('filter') %> */}
          <button className="category-select-mobile category-select">
            filter by category
          </button>
          <div
            className={
              this.state.dropDownOpened
                ? 'dropdown-arrow-container opened'
                : 'dropdown-arrow-container closed'
            }
          >
            {/* <%= svg('dropdown_arrow') %> */}
          </div>
        </div>
        <div
          className={
            this.state.dropDownOpened
              ? 'content-wrapper opened'
              : 'content-wrapper'
          }
        >
          <div className="search-mobile">
            <div className="search-wrapper">
              {/* <%= svg('search') %> */}
              <input
                id="searchKeyWordMobile"
                name="searchKeyWordMobile"
                type="text"
                placeholder="Search articles..."
              />
            </div>
          </div>
          <a href="/" title="Home" className="category home">
            {/* <%= svg('home_button') %> */}
            <span>Home</span>
          </a>
          {categories.map(category => <Category data={category} key={category.name} />)}
          <div className="search-container desktop">
            <div className="search-wrapper">
              {/* <%= svg('search') %> */}
              <input
                id="searchKeyWord"
                name="searchKeyWord"
                type="text"
                placeholder="Search articles"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
