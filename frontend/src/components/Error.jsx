import {React} from 'chimera/react';
import {Icon} from 'components';

export function Error() {
    return (
        <div className="state-error">
            <Icon name="exclamation-circle"/>
            <h5>Something went wrong...</h5>
        </div>
    );
}
