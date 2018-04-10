import {Icon} from 'chimera/icons';
import {React} from 'chimera/react';

export function Error() {
    return (
        <div className="state-error">
            <Icon icon="exclamation-circle"/>
            <h5>Something went wrong :(</h5>
        </div>
    );
}
