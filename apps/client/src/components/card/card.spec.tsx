import { render } from '@testing-library/react';
import { Card } from './card';

describe('Card', () => {
  it('should render', () => {
    const { baseElement } = render(<Card/>);
    expect(baseElement).toBeDefined();
  });
});
