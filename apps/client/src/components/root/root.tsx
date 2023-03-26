import { ReactElement, StrictMode } from 'react';
import { App } from '../app/app';

export function Root(): ReactElement {
  return (
    <StrictMode>
      <App/>
    </StrictMode>
  );
}
