import { Fragment, ReactElement } from 'react';
import { Details } from '../details/details';
import { Fallback } from '../fallback/fallback';
import { Form } from '../form/form';
import { PageButton } from '../page-button/page-button';
import { Panel } from '../panel/panel';
import { useViewportState, ViewportState } from './viewport.state';
import { CodePoint, getCodePoints, Page, Search, Status } from '../../models';

function firstValueFrom<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

function getCodePoints2(_: Search): Promise<Page<CodePoint>> {
  return Promise.resolve(getCodePoints(_));
}

export function Viewport(): ReactElement {
  const [state, setState] = useViewportState();

  function onHover(active?: CodePoint): void {
    setState({ active });
  }

  function onNext(update: Partial<ViewportState>): void {
    setState({ ...update, status: Status.Resolved });
  }

  function onError(update: Partial<ViewportState>): void {
    setState({ ...update, status: Status.Rejected });
  }

  function onStart(): Promise<Page<CodePoint>> {
    return getCodePoints2(state.search);
  }

  function onStartNext(page: Page<CodePoint>): void {
    onNext({ page });
  }

  function onStartError(error: Error): void {
    onError({ error });
  }

  function onChange(search: Search): Promise<void> {
    function onChangeNext(page: Page<CodePoint>): void {
      onNext({ page, search });
    }

    function onChangeError(error: Error): void {
      onError({ error, search });
    }

    return getCodePoints2(search).then(onChangeNext).catch(onChangeError);
  }

  async function onGetNext(): Promise<void> {
    if (state.page?.hasNext) {
      await firstValueFrom(onChange({ ...state.search, page: (state.search.page ?? 0) + 1 }));
    }
  }

  async function onGetPrevious(): Promise<void> {
    if (state.page?.hasPrevious) {
      await firstValueFrom(onChange({ ...state.search, page: (state.search.page ?? 1) - 1 }));
    }
  }

  async function onSubmit(search: Search): Promise<void> {
    await firstValueFrom(onChange({ ...search, page: 1 }));
  }

  return (
    <Fragment>
      <Form onSubmit={onSubmit}/>
      {state.status === Status.Resolved ? (
        (state.page?.children?.length ?? 0) > 0 ? (
          <Panel codePoints={state.page?.children} onHover={onHover}/>
        ) : (
          <Fallback empty/>
        )
      ) : (
        <Fallback error={state.status === Status.Rejected} message={state.error?.message}/>
      )}
      <PageButton previous onClick={onGetPrevious}/>
      <PageButton next onClick={onGetNext}/>
      <Details codePoint={state.active}/>
    </Fragment>
  );
}
