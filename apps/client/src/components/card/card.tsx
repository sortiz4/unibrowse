import { ReactNode, useRef } from 'react';
import { Literal } from '../literal';
import { CodePoint } from '../../common/models';

export interface CardProps {
  readonly codePoint?: CodePoint;
  readonly onHover?: (_?: CodePoint) => void;
}

export function Card(props: CardProps): ReactNode {
  const hover = useRef(false);

  const onHover = (): void => {
    props.onHover?.(!hover.current ? props.codePoint : void 0);
    hover.current = !hover.current;
  };

  return (
    <div className="card" onMouseEnter={onHover} onMouseLeave={onHover}>
      <Literal value={props.codePoint?.key}/>
      <dl className="card-subtitle">
        <dt>
          {props.codePoint?.value}
        </dt>
        <dd>
          {props.codePoint?.name}
        </dd>
      </dl>
    </div>
  );
}
