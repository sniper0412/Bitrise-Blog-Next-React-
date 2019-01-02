import renderer from 'react-test-renderer';

import { mockPosts } from 'dataMocks';
import FeaturedPost from '../components/FeaturedPost';

describe('FeaturedPost component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FeaturedPost {...mockPosts[0]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
