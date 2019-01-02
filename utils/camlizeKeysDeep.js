import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

const camlizeKeysDeep = obj => {
  if (isPlainObject(obj)) {
    return mapKeys(mapValues(obj, camlizeKeysDeep), (_, key) => camelCase(key));
  }

  return obj;
};

export default camlizeKeysDeep;
