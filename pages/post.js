import React from 'react'
import Butter from 'buttercms'
import Head from 'next/head'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const butter = Butter(process.env.BUTTER_TOKEN);
    const { data : {data: post}} = await butter.post.retrieve(query.slug);  
    
    return {post};
  }

  render() {
    const {post} = this.props;

    return (
      <div className="post-content">
        <Head>
          <title>{post.seo_title}</title>
          <meta name="description" content={post.meta_description} />
          <meta name="og:image" content={post.featured_image} />
        </Head>

        <h1 className="post-title">{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html: post.body}} />
      </div>
    )
  }
}