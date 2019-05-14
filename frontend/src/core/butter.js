import {Component as BaseComponent, createElement, useContext} from 'react';

// Hidden React aliases
const _createElement = createElement;
const _useContext = useContext;

// Hidden component properties
const UPDATER = Symbol.for('butter.updater');

// Lifecycle method aliases
const ALIASES = [
    ['componentDidCatch', 'afterCatch'],
    ['componentDidMount', 'afterMount'],
    ['componentDidUpdate', 'afterUpdate'],
    ['componentWillUnmount', 'beforeUnmount'],
    ['shouldComponentUpdate', 'shouldUpdate'],
    ['UNSAFE_componentWillMount', 'beforeMount'],
    ['UNSAFE_componentWillReceiveProps', 'beforeProps'],
    ['UNSAFE_componentWillUpdate', 'beforeUpdate'],
];

// Dummy state
const STATE = {};

/**
 * Coerces an object into an array.
 */
const _array = (object) => (
    !(object instanceof Array) ? (
        [object]
    ) : (
        object
    )
);

/**
 * Waits for each callback in order.
 */
const _awaitAll = async (callbacks) => {
    const results = [];
    for(const callback of callbacks) {
        results.push(await callback());
    }
    return results;
};

/**
 * Consumes and combines one or more contexts using a consumer.
 */
const _consume = (context, consumer) => {
    const result = {};
    for(const _context of _array(context)) {
        Object.assign(result, consumer(_context));
    }
    return Object.freeze(result);
};

/**
 * Consumes and combines one or more contexts (does not subscribe).
 */
const _consumer = (context) => _consume(context, _readContext);

/**
 * A no-op function (used as a fallback).
 */
const _noop = () => {};

/**
 * Reads a context without subscribing to it.
 */
const _readContext = (context) => context._currentValue;

/**
 * An enhanced render method (wrapper).
 */
const _render = (instance, render) => {
    // Access the context
    const {context} = instance.constructor;

    // Render the component
    return typeof context !== 'undefined' ? (
        _createElement(
            Consumer,
            {context},
            (context) => {
                // Update the context
                instance.context = context;

                // Render the component
                return render(instance.props);
            },
        )
    ) : (
        render(instance.props)
    );
};

/**
 * Consumes and combines one or more contexts (subscribes).
 */
const Consumer = ({children, context}) => (
    children(_consume(context, _useContext))
);

/**
 * An enhanced component with a modern interface.
 */
export class Component extends BaseComponent {
    constructor(props) {
        super(props);

        // Bind the updater
        this[UPDATER] = this[UPDATER].bind(this);

        // Consume the context
        if(typeof this.constructor.context !== 'undefined') {
            this.context = _consumer(this.constructor.context);
        }

        // Monkey patch the render method
        this.render = _render.bind(null, this, this.render.bind(this));

        // Bind the lifecycle methods
        for(const [name, alias] of ALIASES) {
            if(alias in this) {
                this[name] = this[alias];
            }
        }
    }

    [UPDATER]() {
        return new Promise(resolve => {
            if(this.updater.isMounted(this)) {
                super.setState(STATE, resolve);
            } else {
                resolve();
            }
        });
    }

    setState(updater, callback) {
        // Normalize the updater
        const _updater = typeof updater === 'object' ? (
            () => Object.assign(this, updater)
        ) : typeof updater === 'function' ? (
            updater
        ) : (
            _noop
        );

        // Normalize the callback
        const _callback = typeof callback === 'function' ? (
            callback
        ) : (
            _noop
        );

        // Call the functions and wait
        return _awaitAll([_updater, this[UPDATER], _callback]).then(_noop);
    }
}
