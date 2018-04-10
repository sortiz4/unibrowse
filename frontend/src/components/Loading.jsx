import {Icon} from 'chimera/icons';
import {React} from 'chimera/react';

export function Loading() {
    return (
        <div className="state-loading">
            <Icon icon="spinner" spin/>
        </div>
    );
}
