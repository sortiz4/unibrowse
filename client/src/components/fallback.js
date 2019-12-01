import {Icon} from 'components';
import {React} from 'core/react';

export function Fallback({state}) {
    return state.didReject ? (
        <div className="fallback-error">
            <Icon name="exclamation-circle"/>
            <h5>{`${state.message ?? 'Something went wrong...'}`}</h5>
        </div>
    ) : (
        <div className="fallback-loading">
            <Icon name="spinner" spin/>
        </div>
    );
}
