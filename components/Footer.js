import React from 'react';
import SVG from 'react-inlinesvg';

const UTM = '?utm_source=bitriseblog&utm_medium=web&utm_campaign=static';

const Footer = () => (
  <div className="footer">
    <div className="top-footer">
      <div className="socials">
        <h4>Always stay in the loop!</h4>
        <div className="separator" />
        <div className="social-icons">
          <a className="twitter" href="https://twitter.com/bitrise" tabIndex="-1" target="_blank">
            <span>
              <SVG src="/static/svg/social_icons/twitter_footer.svg" />
            </span>
          </a>
          <a className="facebook" href="https://facebook.com/bitrise.io" tabIndex="-1" target="_blank">
            <span>
              <SVG src="/static/svg/social_icons/facebook_footer.svg" />
            </span>
          </a>
          <a className="slack" href="https://chat.bitrise.io/" tabIndex="-1" target="_blank">
            <span>
              <SVG src="/static/svg/social_icons/slack.svg" />
            </span>
          </a>
          <a className="github" href="https://github.com/bitrise-io" tabIndex="-1" target="_blank">
            <span>
              <SVG src="/static/svg/social_icons/github.svg" />
            </span>
          </a>
        </div>
        <a className="v3-button big status-page none" target="_blank" href="https://status.bitrise.io/">
          All Systems Operational
        </a>
      </div>
      <div className="product">
        <h4>Product</h4>
        <div className="separator" />
        <a tabIndex="-1" href="https://www.bitrise.io/pricing">
          Pricing
        </a>
        <a tabIndex="-1" href={`https://www.bitrise.io/cli${UTM}`}>
          CLI
        </a>
        <a tabIndex="-1" href={`https://www.bitrise.io/integrations${UTM}`}>
          Integrations
        </a>
      </div>
      <div className="company">
        <h4>Company</h4>
        <div className="separator" />
        <a tabIndex="-1" href={`https://www.bitrise.io/about${UTM}`}>
          About
        </a>
        <a tabIndex="-1" href={`https://www.bitrise.io/job${UTM}`}>
          Careers
        </a>
        <a tabIndex="-1" href={`https://www.bitrise.io/terms${UTM}`}>
          Terms
        </a>
        <a tabIndex="-1" href={`https://www.bitrise.io/privacy${UTM}`}>
          Privacy policy
        </a>
        <a tabIndex="-1" href={`https://www.bitrise.io/cookie_policy${UTM}`}>
          Cookie policy
        </a>
      </div>
      <div className="support">
        <h4>Support</h4>
        <div className="separator" />
        <a target="_blank" tabIndex="-1" href="https://devcenter.bitrise.io">
          Docs &amp; DevCenter
        </a>
        <a target="_blank" tabIndex="-1" href="https://discuss.bitrise.io">
          Discuss
        </a>
        <a target="_blank" tabIndex="-1" href="https://blog.bitrise.io/">
          News Blog
        </a>
        <a tabIndex="-1" href={`https://www.bitrise.io/contact${UTM}`}>
          Contact
        </a>
      </div>
    </div>
    <div className="bottom-footer">
      <h4>
        Compiled with{' '}
        <span className="heart-container">
          <SVG src="/static/svg/footer_heart.svg" />
        </span>
        in London &amp; Budapest
      </h4>
      <a className="copyright" target="_blank" tabIndex="-1" href={`https://www.bitrise.io${UTM}`}>
        Copyright © 2014-2017 Bitrise ltd.
      </a>
    </div>
  </div>
);

Footer.propTypes = {};

export default Footer;
