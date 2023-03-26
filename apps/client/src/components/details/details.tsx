import { Fragment, ReactElement } from 'react';
import { CodePoint } from '../../models';

interface DetailsProps {
  codePoint?: CodePoint;
}

export function Details({ codePoint }: DetailsProps): ReactElement {
  return codePoint ? (
    <div className="details">
      <dl>
        <dt>
          Plane
        </dt>
        <dd>
          {codePoint.plane}
        </dd>
      </dl>
      <dl>
        <dt>
          Block
        </dt>
        <dd>
          {codePoint.block}
        </dd>
      </dl>
      <dl>
        <dt>
          Category
        </dt>
        <dd>
          {codePoint.category}
        </dd>
      </dl>
      <dl>
        <dt>
          Combining Class
        </dt>
        <dd>
          {codePoint.combiningClass}
        </dd>
      </dl>
      <dl>
        <dt>
          Bidirectional Class
        </dt>
        <dd>
          {codePoint.bidirectionalClass}
        </dd>
      </dl>
      <dl>
        <dt>
          Decomposition Class
        </dt>
        <dd>
          {codePoint.decompositionClass}
        </dd>
      </dl>
    </div>
  ) : (
    <Fragment/>
  );
}
