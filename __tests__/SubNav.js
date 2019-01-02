import renderer from 'react-test-renderer';

import { mockCategories } from 'dataMocks';
import SubNav from '../components/SubNav';

describe('SubNav component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SubNav categories={mockCategories} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
