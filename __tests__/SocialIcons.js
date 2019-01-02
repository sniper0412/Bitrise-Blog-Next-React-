import renderer from 'react-test-renderer';

import SocialIcons from '../components/SocialIcons';

describe('SocialIcons component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SocialIcons />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertically', () => {
    const tree = renderer.create(<SocialIcons vertical />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
