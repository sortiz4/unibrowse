import { ReactNode } from 'react';
import { Icon, Icons } from '../icon';

export interface FallbackProps {
  readonly empty?: boolean;
  readonly message?: string;
}

export function Fallback(props: FallbackProps): ReactNode {
  return props.empty ? (
    <div className="fallback">
      <Icon icon={Icons.circleQuestion}/>
      <h5>
        {props.message ?? `We couldn't find anything...`}
      </h5>
    </div>
  ) : (
    null
  );
}
