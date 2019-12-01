import {Literal} from 'components';
import {React} from 'core/react';

export function Card({code, onHover}) {
    const hover = React.useRef(false);
    const onHoverOverride = () => {
        onHover(!hover.current ? code : null);
        hover.current = !hover.current;
    };
    return (
        <div
            className="card"
            onMouseEnter={onHoverOverride}
            onMouseLeave={onHoverOverride}
        >
            <div className="card-header">
                <Literal value={code.key}/>
                <dl className="card-subtitle">
                    <dt>{code.value}</dt>
                    <dd>{code.name}</dd>
                </dl>
            </div>
        </div>
    );
}
