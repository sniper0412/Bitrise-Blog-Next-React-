const { parse } = require('url');
const Path = require('path-parser').default;
const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');

const { fetchPosts, searchPosts } = require('./services/butter');
const mailchimp = require('./services/mailchimp');
const routePaths = require('./route-paths');

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

module.exports = [
  redirectWithSlugConfig(`${routePaths.posts}/:slug`, '/post'),
  redirectWithSlugConfig(`${routePaths.categories}/:slug`, '/category'),
  redirectWithSlugConfig(`${routePaths.tags}/:slug`, '/tag'),
  redirectWithSlugConfig(`${routePaths.authors}/:slug`, '/author'),
  createAPIPath('GET', '/fetch-posts', async req => {
    const { query } = parse(req.url, true);
    const camelCaseQuery = mapKeys(query, (_, key) => camelCase(key));

    let result;
    if (query.query) {
      result = await searchPosts(camelCaseQuery);
    } else {
      result = await fetchPosts(camelCaseQuery);
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
  })
];
