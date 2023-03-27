import { ReactElement } from 'react';
import { DivProps } from 'react-html-props';

export function Container(props: DivProps): ReactElement {
  return (
    <div className="container" {...props}/>
  );
}
