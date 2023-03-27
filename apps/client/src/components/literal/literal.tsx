import { ReactElement } from 'react';

interface LiteralProps {
  readonly value?: number;
}

export function Literal({ value = 0 }: LiteralProps): ReactElement {
  const code = Math.min(Math.max(value, 32), 2 ** 32 - 1);

  return (
    <h4 dangerouslySetInnerHTML={{ __html: `&#${code};` }}/>
  );
}
