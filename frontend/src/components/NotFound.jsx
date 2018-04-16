import {Icon} from 'chimera/icons';
import {React} from 'chimera/react';

export function NotFound() {
    return (
        <div className="state-loading">
            <Icon icon="question-circle"/>
            <h5>We couldn't find anything...</h5>
        </div>
    );
}
