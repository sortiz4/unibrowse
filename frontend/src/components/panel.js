import {Card} from 'components';
import {React} from 'core/react';

export function Panel({page, onHover}) {
    return (
        <div className="panel">
            {page.map((code, i) => (
                <Card
                    key={i}
                    code={code}
                    onHover={onHover}
                />
            ))}
        </div>
    );
}
