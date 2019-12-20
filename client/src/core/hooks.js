import {React} from 'core/react';

/**
 * Constructs the state once and mutates the state on subsequent updates.
 */
export function useClassState(constructor, initial) {
    const state = React.useRef(
        React.useMemo(
            () => Object.assign(new constructor(), initial),
            [constructor, initial],
        )
    );
    const params = useParams(React.useState(true));
    return [
        state.current,
        React.useCallback(
            updater => {
                const [signal, setSignal] = params.current;
                if(typeof updater !== 'function') {
                    Object.assign(state.current, updater);
                } else {
                    updater(state.current);
                }
                setSignal(!signal);
            },
            [state, params],
        ),
    ];
}

/**
 * Reduces invalidation by storing parameters in a stable container.
 */
export function useParams(current) {
    const params = React.useRef(current);
    params.current = current;
    return params;
}

/**
 * Ignores the promise returned by a concurrent effect.
 */
export function usePromiseEffect(effect, inputs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useEffect(() => void effect(), inputs);
}

/**
 * State that will not enqueue an update when changed.
 */
export function useShadowState(initial) {
    const state = React.useRef(initial);
    return [
        state,
        React.useCallback(
            update => void (state.current = update),
            [state],
        ),
    ];
}

// Module namespace
export const Hooks = {
    useClassState,
    useParams,
    usePromiseEffect,
    useShadowState,
};
