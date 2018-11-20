import {Icon} from 'components';
import {React} from 'core/react';

export function Loading() {
    return (
        <div className="state-loading">
            <Icon name="spinner" spin/>
        </div>
    );
}
