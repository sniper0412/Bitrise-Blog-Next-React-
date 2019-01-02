import renderer from 'react-test-renderer';

import { mockPosts } from 'dataMocks';
import PostSummary from '../components/PostSummary';

describe('PostSummary component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PostSummary {...mockPosts[0]} defaultImagePath="http://default.img" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with the default image', () => {
    const tree = renderer
      .create(<PostSummary {...mockPosts[0]} featuredImage={null} defaultImagePath="http://default.img" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
