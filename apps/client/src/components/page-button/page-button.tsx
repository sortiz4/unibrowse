import { ReactElement } from 'react';
import { AProps } from 'react-html-props';
import { Icon } from '../icon/icon';

interface PageButtonProps extends AProps {
  readonly next?: boolean;
  readonly previous?: boolean;
}

export function PageButton({ next, previous, ...props }: PageButtonProps): ReactElement {
  const direction = next ? 'right' : 'left';

  return (
    <a className={`page-button-${direction}`} {...props}>
      <h6>
        <Icon name={`chevron-${direction}`}/>
      </h6>
    </a>
  );
}
