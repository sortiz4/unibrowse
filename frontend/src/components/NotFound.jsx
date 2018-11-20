import {React} from 'chimera/react';
import {Icon} from 'components';

export function NotFound() {
    return (
        <div className="state-loading">
            <Icon name="question-circle"/>
            <h5>We couldn't find anything...</h5>
        </div>
    );
}
