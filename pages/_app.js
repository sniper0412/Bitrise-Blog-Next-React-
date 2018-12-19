import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import { fetchCategories } from '../services/butter';

import Navigation from '../components/Navigation';
import SubNav from '../components/SubNav';
import Footer from '../components/Footer';

import '../assets/stylesheets/application.scss';

export default class extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const categories = await fetchCategories();
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      categories
    };
  }

  render() {
    const { Component, pageProps, categories } = this.props;

    return (
      <Container>
        <Head>
          <link rel="stylesheet" media="screen" href="https://cloud.typography.com/7981312/721124/css/fonts.css" />
          <link
            rel="stylesheet"
            media="screen"
            href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,300,200,500,600,700,900"
          />
        </Head>
        <Navigation />
        <SubNav categories={categories} />
        <div className="content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </Container>
    );
  }
}
