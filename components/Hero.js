import React from 'react';

import Subscription from './Subscription';

const Hero = () => (
  <div className="hero">
    <div className="content-wrapper">
      <div className="hero-inner">
        <div className="newsletter">
          <h1>Bitrise Blog</h1>
          <div className="text">
            <p>
              Articles about Continuous Integration & Delivery, automation, iOS code signing, DevOps, and awesome tech
            </p>
            <Subscription />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Hero.propTypes = {};

export default Hero;
