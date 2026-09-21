import { ReactNode } from 'react';
import { Card } from '../card';
import { CodePoint } from '../../common/models';

export interface PanelProps {
  readonly codePoints?: CodePoint[];
  readonly onHover?: (_?: CodePoint) => void;
}

export function Panel(props: PanelProps): ReactNode {
  return (
    <div className="panel">
      {props.codePoints?.map?.((codePoint: CodePoint, i: number): ReactNode => (
        <Card key={i} codePoint={codePoint} onHover={props.onHover}/>
      ))}
    </div>
  );
}
