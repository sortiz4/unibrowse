import { render } from '@testing-library/react';
import { Details } from './details';

describe('Details', () => {
  it('should render', () => {
    const { baseElement } = render(<Details/>);
    expect(baseElement).toBeDefined();
  });
});
