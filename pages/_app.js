import React from 'react';
import App, { Container } from 'next/app';
import Butter from 'buttercms';

import Navigation from '../components/Navigation';
import Categories from '../components/Categories';

import './style.css';

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
        <Navigation />
        <Categories categories={categories || []} />
        <div className="content">
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}
