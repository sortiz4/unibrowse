import { AnchorHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';
import { Icon } from '../icon/icon';

interface PageButtonProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  next?: boolean;
  previous?: boolean;
}

export function PageButton({ next, previous, ...props }: PageButtonProps): ReactElement {
  const direction = next ? 'right' : 'left';
  return (
    <a className={`page-${direction}`} {...props}>
      <h6>
        <Icon name={`chevron-${direction}`}/>
      </h6>
    </a>
  );
}
