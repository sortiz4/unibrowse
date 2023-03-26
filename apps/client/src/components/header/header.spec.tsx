import { render } from '@testing-library/react';
import { Header } from './header';

describe('Header', () => {
  it('should render', () => {
    const { baseElement } = render(<Header/>);
    expect(baseElement).toBeDefined();
  });
});
