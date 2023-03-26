import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

export function Header(props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>): ReactElement {
  return (
    <section className="header" {...props}/>
  );
}
