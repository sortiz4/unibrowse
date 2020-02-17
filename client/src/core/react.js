export {default as React, Fragment} from 'react';
export {default as ReactDom} from 'react-dom';

export function classNames(...args) {
    return args.filter(s => typeof s === 'string' && s.length > 0).join(' ');
}
