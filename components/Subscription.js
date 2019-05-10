import React from 'react';
import cx from 'classnames';
import SVG from 'react-inlinesvg';

export default class Subscription extends React.Component {
  state = {
    email: '',
    success: null,
    error: null,
    isLoading: false
  };

  subscribeUser = async evt => {
    evt.preventDefault();
    this.setState({ isLoading: true });

    const { email } = this.state;

    if (!email) {
      return this.setState({
        success: null,
        error: 'Please provide an email address',
        isLoading: false
      });
    }

    const { success, message } = await fetch(`/subscribe/${email}`, { method: 'POST' }).then(res => res.json());

    if (success) {
      return this.setState({
        success: 'All set! Thanks for signing up!',
        error: null,
        isLoading: false
      });
    }

    return this.setState({
      success: null,
      error: message,
      isLoading: false
    });
  };

  render() {
    const { success, error, isLoading } = this.state;

    return (
      <div className="subscription">
        <form className="subscription-form" onSubmit={this.subscribeUser}>
          <div className="subscription-wrapper">
            <div className="email-container">
              <input
                id="email-address"
                className={cx({ error: !!error })}
                type="email"
                name="email"
                placeholder="Your email"
                onChange={({ target: { value: email } }) => this.setState({ email })}
              />
              {error && <p>{error}</p>}
            </div>
            <button className="subscribe-button" disabled={isLoading}>
              Subscribe
            </button>
          </div>
          <div className={cx('subscription-wrapper', 'success', { hidden: !success })}>
            <div className="success-container">
              <div className="check-wrapper">
                <SVG src="/static/svg/check.svg" />
              </div>
              <p>{success}</p>
            </div>
          </div>
        </form>
        <a href="/atom" className="feed" value=" " target="blank" />
      </div>
    );
  }
}
