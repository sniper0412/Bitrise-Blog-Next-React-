import renderer from 'react-test-renderer';

import Hero from '../components/Hero';

describe('Hero component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Hero />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
