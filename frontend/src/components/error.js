import {Icon} from 'components';
import {React} from 'core/react';

export function Error({message}) {
    return (
        <div className="state-error">
            <Icon name="exclamation-circle"/>
            <h5>{message ? message : 'Something went wrong...'}</h5>
        </div>
    );
}
