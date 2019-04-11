import {App} from 'components';
import {React, ReactDom} from 'core/react';
import {Dom} from 'core/window';

ReactDom.render(<App/>, Dom.fromId('root'));
