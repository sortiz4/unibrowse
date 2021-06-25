import { render } from '@testing-library/react';
import { Container } from './container';

describe('Container', () => {
  it('should render', () => {
    const { baseElement } = render(<Container/>);
    expect(baseElement).toBeDefined();
  });
});
