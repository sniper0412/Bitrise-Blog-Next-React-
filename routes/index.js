require('dotenv').config();
const { parse } = require('url');
const fs = require('fs');
const { join: joinPath } = require('path');
const request = require('request');
const Path = require('path-parser').default;
const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');

const butter = require('../services/butter');
const mailchimp = require('../services/mailchimp');
const routePaths = require('../route-paths');

const oldPostSlugs = require('./old-post-slugs');

const redirectWithSlugConfig = (from, to) => [
  'GET',
  new Path(from),
  async (app, req, res, { slug }) => app.render(req, res, to, { slug })
];

const createAPIPath = (method, path, handler) => [
  method,
  new Path(path),
  async (app, req, res, params) => {
    const result = await handler(req, params);

    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(result));
  }
];

const createXMLPath = (path, handler) => [
  'GET',
  new Path(path),
  async (_app, _req, res) => {
    const result = await handler();

    res.setHeader('Content-Type', 'application/xml');
    return res.end(result);
  }
];

const oldPostRedirects = oldPostSlugs.map(slug => [
  'GET',
  new Path(`/${slug}`),
  async (app, req, res) => (res.writeHead(301, { Location: `${routePaths.posts}/${slug}` }), res.end())
]);

module.exports = [
  ...oldPostRedirects,
  redirectWithSlugConfig(`${routePaths.posts}/:slug`, '/post'),
  redirectWithSlugConfig(`${routePaths.categories}/:slug`, '/category'),
  redirectWithSlugConfig(`${routePaths.tags}/:slug`, '/tag'),
  redirectWithSlugConfig(`${routePaths.authors}/:slug`, '/author'),
  createAPIPath('GET', '/fetch-posts', async req => {
    const { query } = parse(req.url, true);
    const camelCaseQuery = mapKeys(query, (_, key) => camelCase(key));

    let result;
    if (query.query) {
      result = await butter.searchPosts(camelCaseQuery);
    } else {
      result = await butter.fetchPosts(camelCaseQuery);
    }

    const {
      data: { data: posts }
    } = result;

    return posts;
  }),
  createAPIPath('POST', '/subscribe/:email', async (req, { email }) => {
    try {
      if (await mailchimp.isMemberWithEmailAlreadySubscribed(email)) {
        return {
          success: false,
          message: 'Already subscribed!'
        };
      }

      if (await mailchimp.subscribeMember(email)) {
        return { success: true };
      }

      return {
        success: false,
        message: 'Please provide a valid email address'
      };
    } catch (error) {
      console.error(error.message);
      return {
        success: false,
        message: 'An unexpected error occured'
      };
    }
  }),
  createXMLPath('/rss', butter.fetchRSS),
  createXMLPath('/atom', butter.fetchAtom),
  [
    'GET',
    new Path(`/robots.txt`),
    async (_app, _req, res) => {
      res.setHeader('Content-Type', 'text/plain');
      fs.createReadStream(joinPath(__dirname, 'static', 'robots.txt')).pipe(res);
    }
  ],
  [
    'GET',
    new Path(`/sitemaps/sitemap.xml`),
    async (_app, _req, res) =>
      request(`https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}/sitemaps/sitemap.xml`).pipe(res)
  ]
];
