import {React} from 'chimera/react';

export function Literal({value}) {
    value = Math.min(Math.max(value, 32), 2**32 - 1);
    return <h4 dangerouslySetInnerHTML={{__html: `&#${value};`}}/>;
}
