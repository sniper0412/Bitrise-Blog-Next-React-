import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';
import isNil from 'lodash/isNil';

export const camlizeKeysDeep = obj => {
  if (isPlainObject(obj)) {
    return mapKeys(mapValues(obj, camlizeKeysDeep), (_, key) => camelCase(key));
  }

  return obj;
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const formatDate = dateLike => {
  const date = new Date(dateLike);

  if (isNil(dateLike) || isNaN(date)) {
    return null;
  }

  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
