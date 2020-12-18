import { Icon } from 'components';
import { React } from 'core/react';

export function NotFound() {
  return (
    <div className="fallback-loading">
      <Icon name="question-circle"/>
      <h5>We couldn't find anything...</h5>
    </div>
  );
}
