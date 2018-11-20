import {Icon} from 'components';
import {React} from 'core/react';

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
