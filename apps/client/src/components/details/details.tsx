import { ReactNode } from 'react';
import { CodePoint } from '../../common/models';

export interface DetailsProps {
  readonly codePoint?: CodePoint;
}

export function Details(props: DetailsProps): ReactNode {
  return props.codePoint ? (
    <div className="details">
      <dl>
        <dt>
          Plane
        </dt>
        <dd>
          {props.codePoint.plane}
        </dd>
      </dl>
      <dl>
        <dt>
          Block
        </dt>
        <dd>
          {props.codePoint.block}
        </dd>
      </dl>
      <dl>
        <dt>
          Category
        </dt>
        <dd>
          {props.codePoint.category}
        </dd>
      </dl>
      <dl>
        <dt>
          Combining Class
        </dt>
        <dd>
          {props.codePoint.combiningClass}
        </dd>
      </dl>
      <dl>
        <dt>
          Bidirectional Class
        </dt>
        <dd>
          {props.codePoint.bidirectionalClass}
        </dd>
      </dl>
      <dl>
        <dt>
          Decomposition Class
        </dt>
        <dd>
          {props.codePoint.decompositionClass}
        </dd>
      </dl>
    </div>
  ) : (
    null
  );
}
