import { render } from '@testing-library/react';
import { Fallback } from './fallback';

describe('Fallback', () => {
  it('should render', () => {
    const { baseElement } = render(<Fallback/>);
    expect(baseElement).toBeDefined();
  });
});
