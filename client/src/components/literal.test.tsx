import { render } from '@testing-library/react';
import { Literal } from './literal';

describe('Literal', () => {
  it('should render', () => {
    const { baseElement } = render(<Literal/>);
    expect(baseElement).toBeDefined();
  });
});
