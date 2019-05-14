import React from 'react';
import SVG from 'react-inlinesvg';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Highlight,
  Configure,
  connectStateResults,
  connectSearchBox
} from 'react-instantsearch-dom';
import Link from 'next/link';
import get from 'lodash/get';

import { ALGOLIA_API_KEY, ALGOLIA_APP_KEY, ALGOLIA_INDEX } from '../config';

const searchClient = algoliasearch(ALGOLIA_APP_KEY, ALGOLIA_API_KEY);

const Hit = ({ hit }) => (
  <Link href={`/posts/${hit.slug}`}>
    <a>
      <Highlight attribute="title" hit={hit} tagName="mark" />
    </a>
  </Link>
);

const CustomSearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <form action="/search" noValidate role="search">
    <SVG src="/static/svg/search.svg" />
    <input
      name="q"
      placeholder="Search articles"
      type="search"
      autoComplete="off"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
  </form>
));

const SearchResults = connectStateResults(({ searchState, searchResults }) => {
  const query = get(searchState, 'query');
  if (!query) {
    return null;
  }

  const hitCount = get(searchResults, 'nbHits');

  if (hitCount === 0) {
    return <div className="ais-Hits no-result">No results</div>;
  }

  return <Hits hitComponent={Hit} />;
});

export default () => (
  <InstantSearch indexName={ALGOLIA_INDEX} searchClient={searchClient}>
    <Configure hitsPerPage={5} attributesToRetrieve={['title', 'slug']} attributesToHighlight={['title']} />
    <CustomSearchBox />
    <SearchResults />
  </InstantSearch>
);
