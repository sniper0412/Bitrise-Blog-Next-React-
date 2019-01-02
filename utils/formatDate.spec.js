import formatDate from './formatDate';

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
