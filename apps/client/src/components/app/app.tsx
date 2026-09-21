'use client';
import { ReactNode } from 'react';
import { Viewport } from '../viewport';

export function App(): ReactNode {
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
