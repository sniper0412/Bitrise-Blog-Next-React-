import renderer from 'react-test-renderer';

import Subscription from '../components/Subscription';

describe('Subscription component', () => {
  console.warn('TODO: Check error and success messages');

  it('renders correctly', () => {
    const tree = renderer.create(<Subscription />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
