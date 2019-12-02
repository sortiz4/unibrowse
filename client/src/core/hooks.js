import {React} from 'core/react';

// Hidden React aliases
const _useEffect = React.useEffect;

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
    const [_, setState] = React.useReducer(
        (prevState, updater) => {
            if(typeof updater !== 'function') {
                Object.assign(state.current, updater);
            } else {
                updater(state.current);
            }
            return !prevState;
        },
        true,
    );
    return [state.current, setState];
}

/**
 * State that will not enqueue an update when changed.
 */
export function useHiddenState(initial) {
    const state = React.useRef(initial);
    return [
        state,
        React.useCallback(
            update => void (state.current = update),
            [state],
        ),
    ];
}

/**
 * Wraps the effect and ignores the return value.
 */
export function usePromiseEffect(effect, inputs) {
    _useEffect(() => void effect(), inputs);
}

// Module namespace
export const Hooks = {useClassState, useHiddenState, usePromiseEffect};
