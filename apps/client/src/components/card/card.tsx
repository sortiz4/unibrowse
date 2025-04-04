import { ReactElement, useRef } from 'react';
import { Literal } from '../literal/literal';
import { CodePoint } from '../../common/models';

export interface CardProps {
  readonly codePoint?: CodePoint;
  readonly onHover?: (_?: CodePoint) => void;
}

export function Card({ codePoint, onHover }: CardProps): ReactElement {
  const hover = useRef(false);

  function onHoverOverride(): void {
    onHover?.(!hover.current ? codePoint : void 0);
    hover.current = !hover.current;
  }

  return (
    <div className="card" onMouseEnter={onHoverOverride} onMouseLeave={onHoverOverride}>
      <Literal value={codePoint?.key}/>
      <dl className="card-subtitle">
        <dt>
          {codePoint?.value}
        </dt>
        <dd>
          {codePoint?.name}
        </dd>
      </dl>
    </div>
  );
}
