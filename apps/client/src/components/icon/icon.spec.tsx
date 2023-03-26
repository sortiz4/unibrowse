import { render } from '@testing-library/react';
import { Icon } from './icon';

describe('Icon', () => {
  it('should render', () => {
    const { baseElement } = render(<Icon/>);
    expect(baseElement).toBeDefined();
  });
});
