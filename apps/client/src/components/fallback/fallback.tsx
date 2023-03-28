import { Fragment, ReactElement } from 'react';
import { Icon } from '../icon/icon';

interface FallbackProps {
  readonly empty?: boolean;
  readonly message?: string;
}

export function Fallback({ empty, message }: FallbackProps): ReactElement {
  return empty ? (
    <div className="fallback">
      <Icon name="circle-question"/>
      <h5>
        {message ?? `We couldn't find anything...`}
      </h5>
    </div>
  ) : (
    <Fragment/>
  );
}
