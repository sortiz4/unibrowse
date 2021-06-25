import { ReactElement } from 'react';
import { Container } from './container';
import { Header } from './header';
import { Viewport } from './viewport';

export function App(): ReactElement {
  return (
    <Container>
      <Header>
        <h2>
          Unibrowse
        </h2>
        <h5>
          A Unicode Browser
        </h5>
      </Header>
      <Viewport/>
    </Container>
  );
}
