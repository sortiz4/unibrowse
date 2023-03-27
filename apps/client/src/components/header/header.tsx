import { ReactElement } from 'react';
import { SectionProps } from 'react-html-props';

export function Header(props: SectionProps): ReactElement {
  return (
    <section className="header" {...props}/>
  );
}
