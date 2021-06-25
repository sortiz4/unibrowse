import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

export function Container(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>): ReactElement {
  return (
    <div className="container" {...props}/>
  );
}
