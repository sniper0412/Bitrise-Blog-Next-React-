import parseMetaDescription from './parseMetaDescription';

describe('parseMetaDescription', () => {
  it('parses ButterCMS meta descriptions properly if it has an author', () => {
    const { metaDescription, authors } = parseMetaDescription(
      `Get conclusive test results presented in logs...  🎉
    *anna-batki*`
    );

    expect(metaDescription).toBe('Get conclusive test results presented in logs...  🎉');
    expect(authors).toHaveLength(1);
    expect(authors).toEqual(['anna-batki']);
  });

  it('parses ButterCMS meta descriptions properly without an author', () => {
    const { metaDescription, authors } = parseMetaDescription('Oh, dear, 2018 is almost over');

    expect(metaDescription).toBe('Oh, dear, 2018 is almost over');
    expect(authors).toHaveLength(0);
  });
});
