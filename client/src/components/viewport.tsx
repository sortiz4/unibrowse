import { Fragment, ReactElement } from 'react';
import { firstValueFrom, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Details } from './details';
import { Fallback } from './fallback';
import { Form } from './form';
import { PageButton } from './page-button';
import { Panel } from './panel';
import { getCodePoints } from '../api';
import { useObservableEffect } from '../hooks';
import { CodePoint, Page } from '../models';
import { Status } from '../states/status';
import { Search, useViewportState, ViewportState } from '../states/viewport';

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

  function onStart(): Observable<Page<CodePoint>> {
    return getCodePoints(state.search);
  }

  function onStartNext(page: Page<CodePoint>): void {
    onNext({ page });
  }

  function onStartError(error: Error): void {
    onError({ error });
  }

  function onChange(search: Search): Observable<Page<CodePoint>> {
    function onChangeNext(page: Page<CodePoint>): void {
      onNext({ page, search });
    }

    function onChangeError(error: Error): void {
      onError({ error, search });
    }

    return getCodePoints(search).pipe(tap({ next: onChangeNext, error: onChangeError }));
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

  useObservableEffect([onStart, onStartNext, onStartError], [setState]);

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
