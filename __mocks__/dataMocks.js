export const mockAuthors = [
  {
    slug: 'author-1',
    firstName: 'Bender',
    lastName: 'Rodríguez',
    profileImage: 'http://bender.img',
    title: 'Chief Bending Robot',
    bio: 'A fictional character who is one of the main characters in the animated television series Futurama'
  }
];

export const mockCategories = [
  {
    slug: 'category-1',
    name: 'category 1'
  },
  {
    slug: 'category-2',
    name: 'category 2'
  }
];

export const mockTags = [
  {
    slug: 'tag-1',
    name: 'tag 1'
  },
  {
    slug: 'tag-2',
    name: 'tag 2'
  }
];

export const mockPosts = [
  {
    author: mockAuthors[0],
    slug: 'posts-1',
    seoTitle: 'post 1',
    metaDescription: 'Post 1 description',
    featuredImage: 'http://post-1.img',
    title: 'Post 1',
    body: '<h1>Post 1 body</h1>',
    categories: [mockCategories[0], mockCategories[1]],
    tags: [mockTags[0], mockTags[1]],
    published: 'Wed Jan 02 2019 16:50:20 GMT+0100',
    summary: 'Post 1 summary'
  }
];
