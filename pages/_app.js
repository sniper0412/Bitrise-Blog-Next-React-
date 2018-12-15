import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Butter from 'buttercms';

import Navigation from '../components/Navigation';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

import '../assets/stylesheets/application.scss';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const butter = Butter(process.env.BUTTER_TOKEN);
    const {
      data: { data: categories }
    } = await butter.category.list();

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
        <Categories categories={categories || []} />
        <div className="content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </Container>
    );
  }
}
