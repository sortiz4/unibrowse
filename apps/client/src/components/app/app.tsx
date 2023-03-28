import { ReactElement } from 'react';
import { Viewport } from '../viewport/viewport';

export function App(): ReactElement {
  return (
    <div className="app">
      <section>
        <h2>
          Unibrowse
        </h2>
        <h5>
          A Unicode Browser
        </h5>
      </section>
      <Viewport/>
    </div>
  );
}
