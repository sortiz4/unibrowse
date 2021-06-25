import { ReactElement } from 'react';
import { Card } from './card';
import { CodePoint } from '../models';

interface PanelProps {
  codePoints?: CodePoint[];
  onHover?: (_?: CodePoint) => void;
}

export function Panel({ codePoints, onHover }: PanelProps): ReactElement {
  return (
    <div className="panel">
      {codePoints?.map?.((codePoint, i) => <Card key={i} codePoint={codePoint} onHover={onHover}/>)}
    </div>
  );
}
