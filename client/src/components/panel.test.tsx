import { render } from '@testing-library/react';
import { Panel } from './panel';

describe('Panel', () => {
  it('should render', () => {
    const { baseElement } = render(<Panel/>);
    expect(baseElement).toBeDefined();
  });
});
