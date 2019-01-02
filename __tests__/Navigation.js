import renderer from 'react-test-renderer';

import Navigation from '../components/Navigation';

describe('Navigation component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Navigation />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with burger menu clicked', () => {
    const nav = renderer.create(<Navigation />);
    nav.root.findByType('button').props.onClick();
    expect(nav.toJSON()).toMatchSnapshot();
  });
});
