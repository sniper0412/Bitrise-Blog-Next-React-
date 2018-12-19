const { parse } = require('url');
const Path = require('path-parser').default;
const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');

const { fetchPosts } = require('./services/butter');

module.exports = [
  [
    new Path(`/posts/:slug`),
    async (app, req, res, { slug }) => {
      return app.render(req, res, '/post', {
        slug
      });
    }
  ],
  [
    new Path(`/categories/:slug`),
    async (app, req, res, { slug }) => {
      return app.render(req, res, '/category', {
        slug
      });
    }
  ],
  [
    new Path('/fetch-posts'),
    async (app, req, res) => {
      const { query } = parse(req.url, true);

      const camelCaseQuery = mapKeys((_, key) => camelCase(key));

      const posts = await fetchPosts(camelCaseQuery);

      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(posts));
    }
  ]
];
