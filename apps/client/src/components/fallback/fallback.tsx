import { ReactElement } from 'react';
import { Icon, Icons } from '../icon/icon';

export interface FallbackProps {
  readonly empty?: boolean;
  readonly message?: string;
}

export function Fallback({ empty, message }: FallbackProps): ReactElement | null {
  return empty ? (
    <div className="fallback">
      <Icon icon={Icons.circleQuestion}/>
      <h5>
        {message ?? `We couldn't find anything...`}
      </h5>
    </div>
  ) : (
    null
  );
}
