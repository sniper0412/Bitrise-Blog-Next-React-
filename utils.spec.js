import { camlizeKeysDeep, formatDate } from './utils';

describe('camlizeKeysDeep', () => {
  it('converts the keys in a shallow oject to camelCase', () => {
    const input = {
      lowercase: 'lowercase',
      UPPERCASE: 'UPPERCASE',
      snake_case: 'snake_case',
      'kebab-case': 'kebab-case',
      CONSTANT_CASE: 'CONSTANT_CASE',
      camelCase: 'camelCase',
      PascalCase: 'PascalCase'
    };

    const expected = {
      lowercase: 'lowercase',
      uppercase: 'UPPERCASE',
      snakeCase: 'snake_case',
      kebabCase: 'kebab-case',
      constantCase: 'CONSTANT_CASE',
      camelCase: 'camelCase',
      pascalCase: 'PascalCase'
    };

    expect(camlizeKeysDeep(input)).toMatchObject(expected);
  });

  it('converts deep objects', () => {
    const input = {
      snake_case: 'snake_case',
      DEEPUPPERCASE: {
        NestedPascalCase: 'NestedPascalCase',
        'deep-nested-kebab-case': {
          'super deep separate words': 'super deep separate words'
        }
      }
    };

    const expected = {
      snakeCase: 'snake_case',
      deepuppercase: {
        nestedPascalCase: 'NestedPascalCase',
        deepNestedKebabCase: {
          superDeepSeparateWords: 'super deep separate words'
        }
      }
    };

    expect(camlizeKeysDeep(input)).toMatchObject(expected);
  });

  it(`doesn't modify non-plain objects`, () => {
    expect(camlizeKeysDeep(null)).toBeNull();
    expect(camlizeKeysDeep(NaN)).toBeNaN();
    expect(camlizeKeysDeep('string')).toBe('string');
    expect(camlizeKeysDeep(123)).toBe(123);
    expect(camlizeKeysDeep([1, 2, 3])).toEqual([1, 2, 3]);
    expect(camlizeKeysDeep(new Date())).toBeInstanceOf(Date);
  });
});
describe('formatDate', () => {
  it('formats dateLikes properly', () => {
    expect(formatDate('1984/11/12')).toBe('November 12, 1984');
    expect(formatDate(new Date('2005-05-22'))).toBe('May 22, 2005');
    expect(formatDate(1544887058957)).toBe('December 15, 2018');
    expect(formatDate('2017-03-04T15:17:00Z')).toBe('March 4, 2017');
  });

  it('returns null for invalid dates', () => {
    expect(formatDate()).toBeNull();
    expect(formatDate(null)).toBeNull();
    expect(formatDate(NaN)).toBeNull();
    expect(formatDate('random string')).toBeNull();
    expect(formatDate({ object: 'this is' })).toBeNull();
  });
});
