import renderer from 'react-test-renderer';

import { mockPosts } from 'dataMocks';
import PostList from '../components/PostList';

describe('PostList component', () => {
  it('renders correctly when it can load more', () => {
    const posts = [mockPosts[0]];
    const tree = renderer.create(<PostList initialPosts={posts} count={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when it cannot load more', () => {
    const posts = [mockPosts[0]];
    const tree = renderer.create(<PostList initialPosts={posts} count={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
