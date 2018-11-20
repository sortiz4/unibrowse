import {React} from 'chimera/react';
import {Icon} from 'components';

export function PageButton({next, previous, ...props}) {
    const direction = next ? 'right' : 'left';
    return (
        <a className={`page-${direction}`} {...props}>
            <h6>
                <Icon name={`chevron-${direction}`}/>
            </h6>
        </a>
    );
}
