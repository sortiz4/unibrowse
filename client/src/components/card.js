import { Literal } from 'components';
import { Hooks } from 'core/hooks';
import { React } from 'core/react';

export function Card({ code, onHover }) {
    const [hover, setHover] = Hooks.useShadowState(false);

    function onHoverOverride() {
        onHover(!hover.current ? code : null);
        setHover(!hover.current);
    }

    return (
        <div className="card" onMouseEnter={onHoverOverride} onMouseLeave={onHoverOverride}>
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
