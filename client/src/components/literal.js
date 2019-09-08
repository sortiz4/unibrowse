import {React} from 'core/react';

export function Literal({value}) {
    const code = Math.min(Math.max(value, 32), 2**32 - 1);
    return (
        <h4 dangerouslySetInnerHTML={{__html: `&#${code};`}}/>
    );
}
