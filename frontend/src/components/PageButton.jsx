import {Icon} from 'chimera/icons';
import {React} from 'chimera/react';

export function PageButton({next, previous, ...props}) {
    let direction = next ? 'right' : 'left';
    return (
        <a className={`page-${direction}`} {...props}>
            <h6>
                <Icon icon={`chevron-${direction}`}/>
            </h6>
        </a>
    );
}
