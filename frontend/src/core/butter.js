import {Component as BaseComponent, createElement, useContext} from 'react';

// Hidden React aliases
const _createElement = createElement;
const _useContext = useContext;

// Hidden component properties
const UPDATER = '_butterUpdater';

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
 * A no-op function (fallback).
 */
const _noop = () => {};

/**
 * Coerces an object into an array.
 */
function _array(object) {
    return !(object instanceof Array) ? (
        [object]
    ) : (
        object
    );
}

/**
 * Waits for each callback in order.
 */
async function _awaitAll(callbacks) {
    for(const callback of callbacks) {
        await callback();
    }
}

/**
 * Consumes and combines one or more contexts using a consumer.
 */
function _consume(consumer, context) {
    const aggregate = {}, producers = _array(context);
    for(const producer of producers) {
        Object.assign(aggregate, consumer(producer));
    }
    return Object.freeze(aggregate);
}

/**
 * Consumes and combines one or more contexts (does not subscribe).
 */
function _consumer(context) {
    return _consume(_readContext, context);
}

/**
 * Reads the current value of a context without subscribing to it.
 */
function _readContext(context) {
    return context._currentValue;
}

/**
 * An enhanced render method (wrapper).
 */
function _render(instance, render) {
    // Access the context
    const {context} = instance.constructor;

    // Render the component
    return typeof context !== 'undefined' ? (
        _createElement(
            Consumer,
            {context},
            context => {
                // Update the context
                instance.context = context;

                // Render the component
                return render(instance.props);
            },
        )
    ) : (
        render(instance.props)
    );
}

/**
 * Consumes and combines one or more contexts (does subscribe).
 */
function Consumer({children, context}) {
    return children(_consume(_useContext, context));
}

/**
 * An enhanced component with a modern interface.
 */
export class Component extends BaseComponent {
    constructor(props) {
        super(props);

        // Bind the updater
        this[UPDATER] = () => new Promise(
            resolve => {
                if(this.updater.isMounted(this)) {
                    super.setState(STATE, resolve);
                } else {
                    resolve();
                }
            }
        );

        // Consume the context
        if(typeof this.constructor.context !== 'undefined') {
            this.context = _consumer(this.constructor.context);
        }

        // Monkey patch the render method
        this.render = _render.bind(null, this, this.render.bind(this));
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
        return _awaitAll([_updater, this[UPDATER], _callback]);
    }
}

// Lifecycle methods
for(const [name, alias] of ALIASES) {
    Component.prototype[alias] = () => true;
    Component.prototype[name] = function() {
        return this[alias](...arguments);
    };
}

/**
 * Decorator for accessing context.
 */
export function context({key}) {
    return {
        key,
        kind: 'method',
        placement: 'prototype',
        descriptor: {
            configurable: true,
            enumerable: false,
            get: function() {
                return this.context[key];
            },
        },
    };
}

/**
 * Decorator for accessing props.
 */
export function prop({key}) {
    return {
        key,
        kind: 'method',
        placement: 'prototype',
        descriptor: {
            configurable: true,
            enumerable: false,
            get: function() {
                return this.props[key];
            },
        },
    };
}
