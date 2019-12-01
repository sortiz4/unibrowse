import {React} from 'core/react';

// Hidden React aliases
const _useEffect = React.useEffect;

/**
 * Constructs the state on each update (without callbacks).
 */
export function useClassState(constructor, initial) {
    return React.useReducer(
        (state, update) => Object.assign(new constructor(), state, update),
        React.useMemo(
            () => Object.assign(new constructor(), initial),
            [constructor, initial],
        ),
    );
}

/**
 * Wraps the effect and ignores the return value.
 */
export function usePromiseEffect(effect, inputs) {
    _useEffect(() => void effect(), inputs);
}

// Module namespace
export const Hooks = {useClassState, usePromiseEffect};
