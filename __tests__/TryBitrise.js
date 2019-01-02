import renderer from 'react-test-renderer';

import TryBitrise from '../components/TryBitrise';

describe('TryBitrise component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TryBitrise />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
