import { ReactElement } from 'react';
import { Icon } from '../icon/icon';

interface FallbackProps {
  empty?: boolean;
  error?: boolean;
  message?: string;
}

export function Fallback({ empty, error, message }: FallbackProps): ReactElement {
  return empty ? (
    <div className="fallback-loading">
      <Icon name="question-circle"/>
      <h5>
        {message ?? `We couldn't find anything...`}
      </h5>
    </div>
  ) : error ? (
    <div className="fallback-error">
      <Icon name="exclamation-circle"/>
      <h5>
        {message ?? 'Something went wrong...'}
      </h5>
    </div>
  ) : (
    <div className="fallback-loading">
      <Icon name="spinner" spin/>
    </div>
  );
}
