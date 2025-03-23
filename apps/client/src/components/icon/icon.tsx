import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faChevronLeft, faChevronRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';

export namespace Icons {
  export const chevronLeft = faChevronLeft;
  export const chevronRight = faChevronRight;
  export const circleQuestion = faCircleQuestion;
}

export interface IconProps {
  readonly icon: IconDefinition;
  readonly spin?: boolean;
}

export function Icon(props: IconProps): ReactElement {
  return (
    <FontAwesomeIcon className="icon" {...props}/>
  );
}
