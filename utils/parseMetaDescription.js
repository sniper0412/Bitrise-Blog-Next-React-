import compact from 'lodash/compact';

export default description => {
  if (!description) return {};

  const [metaDescription, ...authors] = description.split('*');

  return {
    metaDescription: metaDescription.trim(),
    authors: compact(authors)
  };
};
