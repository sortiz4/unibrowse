import {Icon} from 'components';
import {React} from 'core/react';

export function Error() {
    return (
        <div className="state-error">
            <Icon name="exclamation-circle"/>
            <h5>Something went wrong...</h5>
        </div>
    );
}
