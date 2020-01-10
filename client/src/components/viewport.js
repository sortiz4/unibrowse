import {
    Details,
    Fallback,
    Form,
    NotFound,
    PageButton,
    Panel,
} from 'components';
import {Hooks} from 'core/hooks';
import {CodePoint} from 'core/models';
import {Fragment, React} from 'core/react';
import {PromiseState} from 'core/states';

class State extends PromiseState {
    index = 1;
    search = {};
}

export function Viewport() {
    const [state, setState] = Hooks.useClassState(State);
    async function onRequest(handler, updater) {
        if(typeof handler !== 'function') {
            handler = request => request;
        }
        if(typeof updater !== 'object') {
            updater = {};
        }
        try {
            const page = await handler(CodePoint.all().paginate()).get();
            setState({didAccept: true, page, ...updater});
        } catch(exc) {
            setState({didReject: exc});
        }
    }
    function onChange(index, search) {
        onRequest(
            request => request.search({page: index, ...search}),
            {index, search},
        );
    }
    function onNext() {
        if(state.page.hasNext) {
            onChange(state.index + 1, state.search);
        }
    }
    function onPrevious() {
        if(state.page.hasPrevious) {
            onChange(state.index - 1, state.search);
        }
    }
    function onHover(details) {
        setState({details});
    }
    function onSubmit(search) {
        onChange(1, search);
    }
    Hooks.usePromiseEffect(onRequest, [setState]);
    return (
        <Fragment>
            <Form onSubmit={onSubmit}/>
            {state.didAccept ? (
                state.page.children.length > 0 ? (
                    <Panel
                        page={state.page}
                        onHover={onHover}
                    />
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
