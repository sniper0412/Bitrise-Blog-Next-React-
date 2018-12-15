import React from 'react';
import cx from 'classnames';
import SVG from 'react-inlinesvg';

export default class Subscription extends React.Component {
  state = {
    email: null,
    isSuccess: false,
    isError: false,
    successMessage: null,
    errorMessage: null
  };

  subscribeUser() {
    const { email } = this.state;

    // TODO: subscribeUserToNewsletter is undefined
    subscribeUserToNewsletter(email).then(responsMessage => {
      switch (responsMessage) {
        case 'ok':
          this.setState({
            isSuccess: true,
            isError: false,
            successMessage: 'All set! Thanks for signing up!',
            errorMessage: null
          });
          break;
        case 'already subscribed':
          this.setState({
            isSuccess: true,
            isError: false,
            successMessage: 'You are already subscribed!',
            errorMessage: null
          });
          break;
        case 'invalid email':
          this.setState({
            isSuccess: false,
            isError: true,
            successMessage: null,
            errorMessage: 'The email address is invalid'
          });
          break;
        case 'empty email':
          this.setState({
            isSuccess: false,
            isError: true,
            successMessage: null,
            errorMessage: 'Please give your email address'
          });
          break;
        default:
          this.setState({ isSuccess: false, isError: false, successMessage: null, errorMessage: null });
      }
    });
  }

  render() {
    const { isError, isSuccess, errorMessage, successMessage } = this.state;

    return (
      <div className="subscription">
        <div className="subscription-form">
          <div className="subscription-wrapper">
            <div className="email-container">
              <input
                id="email-address"
                className={cx({ error: isError })}
                type="email"
                name="email"
                placeholder="Your email"
                onChange={({ target: { value: email } }) => this.setState({ email })}
              />
              {isError && <p>{errorMessage}</p>}
            </div>
            <button className="subscribe-button" onClick={() => this.subscribeUser()}>
              Subscribe
            </button>
          </div>
          <div className={cx('subscription-wrapper', 'success', { hidden: !isSuccess })}>
            <div className="success-container">
              <div className="check-wrapper">
                <SVG src="/static/svg/check.svg" />
              </div>
              <p>{successMessage}</p>
            </div>
          </div>
        </div>
        <a href="/atom" className="feed" value=" " target="blank" />
      </div>
    );
  }
}
