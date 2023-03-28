import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faChevronLeft, faChevronRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';

const icons = createIconSet(
  faChevronLeft,
  faChevronRight,
  faCircleQuestion,
);

interface IconProps {
  readonly name?: string;
  readonly spin?: boolean;
}

function createIconSet(...icons: IconDefinition[]): { [_: string]: IconDefinition } {
  return Object.fromEntries(icons.map(icon => [icon.iconName, icon]));
}

export function Icon({ name = '', ...props }: IconProps): ReactElement {
  return (
    <FontAwesomeIcon className="icon" icon={icons[name]} {...props}/>
  );
}
