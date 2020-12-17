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
    const inputs = useInputs(React.useState(true));
    return [
        state.current,
        React.useCallback(
            updater => {
                const [signal, setSignal] = inputs.current;
                if (typeof updater !== 'function') {
                    Object.assign(state.current, updater);
                } else {
                    updater(state.current);
                }
                setSignal(!signal);
            },
            [state, inputs],
        ),
    ];
}

/**
 * Reduces invalidation by storing inputs in a stable container.
 */
export function useInputs(current) {
    const inputs = React.useRef(current);
    inputs.current = current;
    return inputs;
}

/**
 * Executes and manages an observable subscription.
 */
export function useObservableEffect([event, ...effects], inputs) {
    return React.useEffect(
        () => {
            const observable = event();
            if (typeof observable === 'object' && observable !== null) {
                const subscription = observable.subscribe(...effects);
                return () => subscription.unsubscribe();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        inputs,
    );
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
    useInputs,
    useObservableEffect,
    useShadowState,
};
