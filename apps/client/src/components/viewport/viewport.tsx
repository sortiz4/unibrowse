import { ReactElement } from 'react';
import { useViewportState } from './viewport.state';
import { Details } from '../details/details';
import { Fallback } from '../fallback/fallback';
import { Form } from '../form/form';
import { PageButton } from '../page-button/page-button';
import { Panel } from '../panel/panel';
import { CodePoint, Search } from '../../common/models';
import { getCodePoints } from '../../common/unicode';

export function Viewport(): ReactElement {
  const [state, setState] = useViewportState();

  function onHover(details?: CodePoint): void {
    setState({ details });
  }

  function onChange(search: Search): void {
    return setState({ page: getCodePoints(search), search });
  }

  function onGetNext(): void {
    if (state.page?.hasNext) {
      onChange({ ...state.search, page: (state.search.page ?? 0) + 1 });
    }
  }

  function onGetPrevious(): void {
    if (state.page?.hasPrevious) {
      onChange({ ...state.search, page: (state.search.page ?? 1) - 1 });
    }
  }

  function onSubmit(search: Search): void {
    onChange({ ...search, page: 1 });
  }

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
