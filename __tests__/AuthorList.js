import renderer from 'react-test-renderer';

import AuthorList from '../components/AuthorList';

describe('AuthorList component', () => {
  const authors = [
    {
      slug: 'slug',
      firstName: 'Bender',
      lastName: 'Rodríguez',
      profileImage: 'http://bender.img',
      title: 'Chief Bending Robot',
      bio: 'A fictional character who is one of the main characters in the animated television series Futurama'
    }
  ];

  it('renders correctly', () => {
    const tree = renderer.create(<AuthorList authors={authors} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly in banner mode', () => {
    const tree = renderer.create(<AuthorList authors={authors} isBanner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
