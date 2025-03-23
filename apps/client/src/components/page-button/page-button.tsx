import { ReactElement } from 'react';
import { AProps } from 'react-html-props';
import { Icon, Icons } from '../icon/icon';

export interface PageButtonProps extends AProps {
  readonly next?: boolean;
  readonly previous?: boolean;
}

export function PageButton({ next, previous, ...props }: PageButtonProps): ReactElement {
  return (
    <a className={`page-button-${next ? 'right' : 'left'}`} {...props}>
      <h6>
        <Icon icon={next ? Icons.chevronRight : Icons.chevronLeft}/>
      </h6>
    </a>
  );
}
