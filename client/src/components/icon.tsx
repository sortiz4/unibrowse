import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faChevronLeft, faChevronRight, faExclamationCircle, faQuestionCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';

const set = createIconSet(
  faChevronLeft,
  faChevronRight,
  faExclamationCircle,
  faQuestionCircle,
  faSpinner,
);

interface IconProps {
  name?: string;
  spin?: boolean;
}

function createIconSet(...icons: IconDefinition[]): { [_: string]: IconDefinition } {
  return Object.fromEntries(icons.map(i => [i.iconName, i]));
}

export function Icon({ name = '', ...props }: IconProps): ReactElement {
  return (
    <FontAwesomeIcon icon={set[name]} {...props}/>
  );
}
