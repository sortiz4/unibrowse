import { ReactNode } from 'react';

export interface LiteralProps {
  readonly value?: number;
}

export function Literal(props: LiteralProps): ReactNode {
  const code = Math.min(Math.max(props.value ?? 0, 32), 2 ** 32 - 1);

  return (
    <h4 dangerouslySetInnerHTML={{ __html: `&#${code};` }}/>
  );
}
