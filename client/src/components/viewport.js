import { Details, Fallback, Form, NotFound, PageButton, Panel } from 'components';
import { Hooks } from 'core/hooks';
import { CodePoint } from 'core/models';
import { Fragment, React } from 'core/react';
import { map } from 'core/rx';
import { ObservableState } from 'core/states';

class State extends ObservableState {
  index = 1;
  search = {};
}

export function Viewport() {
  const [state, setState] = Hooks.useClassState(State);

  function onRequest(handler, updater) {
    if (typeof handler !== 'function') {
      handler = request => request;
    }
    if (typeof updater !== 'object') {
      updater = {};
    }
    return handler(CodePoint.all().paginate()).get().pipe(map(page => ({ page, ...updater })));
  }

  function onThen(update) {
    setState({ didResolve: true, ...update });
  }

  function onCatch(exc) {
    setState({ didReject: exc });
  }

  function onChange(index, search) {
    const handler = request => request.search({ page: index, ...search });
    onRequest(handler, { index, search }).subscribe(onThen, onCatch);
  }

  function onNext() {
    if (state.page.hasNext) {
      onChange(state.index + 1, state.search);
    }
  }

  function onPrevious() {
    if (state.page.hasPrevious) {
      onChange(state.index - 1, state.search);
    }
  }

  function onHover(details) {
    setState({ details });
  }

  function onSubmit(search) {
    onChange(1, search);
  }

  Hooks.useObservableEffect([onRequest, onThen, onCatch], [setState]);

  return (
    <Fragment>
      <Form onSubmit={onSubmit}/>
      {state.didResolve ? (
        state.page.children.length > 0 ? (
          <Panel page={state.page} onHover={onHover}/>
        ) : (
          <NotFound/>
        )
      ) : (
        <Fallback state={state}/>
      )}
      <PageButton previous onClick={onPrevious}/>
      <PageButton next onClick={onNext}/>
      <Details details={state.details}/>
    </Fragment>
  );
}
