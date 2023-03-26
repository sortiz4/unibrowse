import { render } from '@testing-library/react';
import { PageButton } from './page-button';

describe('PageButton', () => {
  it('should render', () => {
    const { baseElement } = render(<PageButton/>);
    expect(baseElement).toBeDefined();
  });
});
