import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Butter from 'buttercms';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const butter = Butter(process.env.BUTTER_TOKEN);
    let page = query.page || 1;

    const resp = await butter.post.list({ page: page, page_size: 10 });
    return resp.data;
  }
  
  render() {
    const { next_page, previous_page } = this.props.meta;

    return (
      <div>
        <Head>
          <title>Bitrise Blog</title>
        </Head>
        {this.props.data.map((post, key) => {
          return (
            <div key={key}>
              <a href={`/post/${post.slug}`}>{post.title}</a>
            </div>
          );
        })}

        <br />

        <div>
          {previous_page && (
            <Link href={`/?page=${previous_page}`}>
              <a>Prev</a>
            </Link>
          )}

          {next_page && (
            <Link href={`/?page=${next_page}`}>
              <a>Next</a>
            </Link>
          )}
        </div>
      </div>
    );
  }
}
