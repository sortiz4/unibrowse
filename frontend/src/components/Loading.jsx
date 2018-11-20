import {React} from 'chimera/react';
import {Icon} from 'components';

export function Loading() {
    return (
        <div className="state-loading">
            <Icon name="spinner" spin/>
        </div>
    );
}
