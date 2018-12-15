import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

const UTM = '? utm_source=bitriseblog&utm_medium=web&utm_campaign=static';

export default class Menu extends React.Component {
  state = {
    isMenuOpen: false
  };

  toggleOpen() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    const { isMenuOpen } = this.state;

    return (
      // <% environment.context_class.instance_eval { include ApplicationHelper } %>
      <nav className="menu">
        <div className="menu-content">
          <a className="logo" href="/">
            <SVG src="/static/svg/logo.svg" />
          </a>
          <ul className={cx('menu-options', { opened: isMenuOpen })}>
            <li className="menu-option">
              <a href={`https://www.bitrise.io/integrations${UTM}`}>Integrations</a>
            </li>
            <li className="menu-option">
              <a href={`https://www.bitrise.io/pricing${UTM}`}>Pricing</a>
            </li>
            <li className="menu-option">
              <a href={`https://www.bitrise.io/cli${UTM}`}>CLI</a>
            </li>
            <li className="menu-option">
              <a href={`https://www.bitrise.io/contact${UTM}`}>Contact</a>
            </li>
            <li className="menu-option">
              <a href={`http://devcenter.bitrise.io${UTM}`}>Docs</a>
            </li>
            <li className="side-menu-options">
              <ul>
                <li className="side-menu-option login">
                  <a href={`https://www.bitrise.io/users/sign_in${UTM}`}>Log in</a>
                </li>
                <li className="side-menu-option signup">
                  <a href={`https://www.bitrise.io/users/sign_in${UTM}`}>Sign up!</a>
                </li>
              </ul>
            </li>
          </ul>
          <button className={cx('burger', { open: isMenuOpen })} onClick={() => this.toggleOpen()}>
            <SVG src="/static/svg/burger.svg" />
          </button>
        </div>
      </nav>
    );
  }
}
