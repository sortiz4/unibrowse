import { ReactElement } from 'react';
import { Card } from '../card/card';
import { CodePoint } from '../../models';

interface PanelProps {
  readonly codePoints?: CodePoint[];
  readonly onHover?: (_?: CodePoint) => void;
}

export function Panel({ codePoints, onHover }: PanelProps): ReactElement {
  return (
    <div className="panel">
      {codePoints?.map?.((codePoint, i) => <Card key={i} codePoint={codePoint} onHover={onHover}/>)}
    </div>
  );
}
