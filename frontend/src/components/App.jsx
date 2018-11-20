import {React} from 'chimera/react';
import {Container, Header, Viewport} from 'components';

export function App() {
    return (
        <Container>
            <Header>
                <h2>Unibrowse</h2>
                <h5>The unicode browser</h5>
            </Header>
            <Viewport/>
        </Container>
    );
}
