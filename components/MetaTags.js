import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const MetaTags = ({ title, description, ogTitle, ogDescription, pathname, image }) => (
  <Head>
    <title>{title && `${title} | `}Bitrise Blog</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`https://blog.bitrise.io/${pathname}`} />

    <meta property="fb:app_id" content="649161285439710" />
    <meta property="og:title" content={ogTitle} />
    <meta property="og:description" content={ogDescription} />
    <meta property="og:url" content={`https://blog.bitrise.io/${pathname}`} />
    <meta property="og:site_name" content="Bitrise Blog" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1910" />
    <meta property="og:image:height" content="1000" />
  </Head>
);

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.string
};

MetaTags.defaultProps = {
  ogTitle: 'Bitrise Blog - Mobile Continuous Integration and Delivery',
  description:
    'Articles about Continuous Integration & Delivery, automation, iOS code signing, DevOps, and awesome tech',
  ogDescription:
    'Bitrise Blog - Mobile Continuous Integration and Delivery for your whole team, with dozens of integrations for your favourite services.',
  pathname: '',
  image: 'https://www.bitrise.io/assets/placeholders/website-social-embed.png'
};

export default MetaTags;
