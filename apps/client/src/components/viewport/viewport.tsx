import { ReactNode } from 'react';
import { useViewportState } from './viewport.state';
import { Details } from '../details';
import { Fallback } from '../fallback';
import { Form } from '../form';
import { PageButton } from '../page-button';
import { Panel } from '../panel';
import { CodePoint, Search } from '../../common/models';
import { getCodePoints } from '../../common/unicode';

export function Viewport(): ReactNode {
  const [state, setState] = useViewportState();

  const onHover = (details?: CodePoint): void => {
    setState({ details });
  };

  const onChange = (search: Search): void => {
    return setState({ page: getCodePoints(search), search });
  };

  const onGetNext = (): void => {
    if (state.page?.hasNext) {
      onChange({ ...state.search, page: (state.search.page ?? 0) + 1 });
    }
  };

  const onGetPrevious = (): void => {
    if (state.page?.hasPrevious) {
      onChange({ ...state.search, page: (state.search.page ?? 1) - 1 });
    }
  };

  const onSubmit = (search: Search): void => {
    onChange({ ...search, page: 1 });
  };

  return (
    <>
      <Form onSubmit={onSubmit}/>
      {(state.page?.children?.length ?? 0) > 0 ? (
        <Panel codePoints={state.page?.children} onHover={onHover}/>
      ) : (
        <Fallback empty/>
      )}
      <PageButton previous onClick={onGetPrevious}/>
      <PageButton next onClick={onGetNext}/>
      <Details codePoint={state.details}/>
    </>
  );
}
