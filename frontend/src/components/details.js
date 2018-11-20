import {CodePoint} from 'models/codepoint';
import {React} from 'core/react';

export function Details({details}) {
    return details instanceof CodePoint ? (
        <div className="details">
            <dl>
                <dt>Block</dt>
                <dd>{details.block}</dd>
            </dl>
            <dl>
                <dt>Category</dt>
                <dd>{details.category}</dd>
            </dl>
            <dl>
                <dt>Combining Class</dt>
                <dd>{details.combiningClass}</dd>
            </dl>
            <dl>
                <dt>Bidirectional Class</dt>
                <dd>{details.bidirectionalClass}</dd>
            </dl>
            <dl>
                <dt>Decomposition Class</dt>
                <dd>{details.decompositionClass}</dd>
            </dl>
        </div>
    ) : (
        null
    );
}
