import {Container, Header, Viewport} from 'components';
import {React} from 'core/react';

export function App() {
    return (
        <Container>
            <Header>
                <h2>Unibrowse</h2>
                <h5>A Unicode Browser</h5>
            </Header>
            <Viewport/>
        </Container>
    );
}
