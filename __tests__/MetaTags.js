import renderer from 'react-test-renderer';

import MetaTags from '../components/MetaTags';

describe('MetaTags component', () => {
  console.warn('FIXME: Snapshot does not get rendered');

  it('renders correctly with defaults', () => {
    const tree = renderer.create(<MetaTags />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom props', () => {
    const tree = renderer
      .create(
        <MetaTags
          title="Title"
          description="Simple description"
          ogTitle="Open Graph Title"
          ogDescription="Open Graph Description"
          pathname="/whatever?asd"
          image="http://meta.img"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
