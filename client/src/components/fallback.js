import {Icon} from 'components';
import {React} from 'core/react';

function mapLogMessage(message) {
    if (message instanceof Error) {
        console.error(message);
        return `${message}`;
    }
    return message;
}

export function Fallback({state}) {
    return state.didReject ? (
        <div className="fallback-error">
            <Icon name="exclamation-circle"/>
            <h5>{mapLogMessage(state.message ?? 'Something went wrong...')}</h5>
        </div>
    ) : (
        <div className="fallback-loading">
            <Icon name="spinner" spin/>
        </div>
    );
}
