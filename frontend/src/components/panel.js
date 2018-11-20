import {Card} from 'components';
import {React} from 'core/react';

export function Panel({paginator, onHover}) {
    return (
        <div className="panel">
            {paginator.map((code, i) => (
                <Card
                    key={i}
                    code={code}
                    onHover={onHover}
                />
            ))}
        </div>
    );
}
