# Bitrise Blog

Using NextJS and React

## Development

- `cp .env.example .env`
- Update the `.env` file
- `yarn`
- `yarn start` (or `PORT=1234 yarn start`)
- Navigate to [localhost:3000](http://localhost:3000)

## Sitemap

You can generate a sitemap running `yarn sitemap`.

If you'd like to use a custom path, use `yarn sitemap -- /your/custom/path/sitemap.xml`.

## Algolia

The site uses Algolia instant search, to reindex the posts run `yarn algolia`

*Note:* Make sure you have the proper `ALGOLIA_*` environment variables set.
