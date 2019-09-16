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
 * Consumes and combines one or more context values using a consumer.
 */
function _consume(consumer, from) {
    from = !(from instanceof Array) ? [from] : from;
    return Object.freeze(
        from.reduce(
            (a, c) => Object.assign(a, consumer(c)),
            {},
        )
    );
}

/**
 * Provides one or more context values.
 */
function _provide(from, children) {
    return from.length > 0 ? (
        _createElement(
            from[0][0].Provider,
            {value: from[0][1]},
            _provide(from.slice(1), children),
        )
    ) : (
        children
    );
}

/**
 * Consumes and combines one or more context values (does not subscribe).
 */
function _read(from) {
    return _consume(_readContext, from);
}

/**
 * Reads a context value without subscribing to it.
 */
function _readContext(context) {
    return context._currentValue;
}

/**
 * An enhanced render method (wrapper).
 */
function _render(instance, render) {
    // Access the sources
    const {consume} = instance.constructor;

    // Render the component
    return typeof consume !== 'undefined' ? (
        _createElement(
            Consume,
            {from: consume},
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
 * An enhanced component with a simple interface.
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

        // Read the sources
        if(typeof this.constructor.consume !== 'undefined') {
            this.context = _read(this.constructor.consume);
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

        // Resolve the functions
        return (
            Promise
                .resolve()
                .then(_updater)
                .then(this[UPDATER])
                .then(_callback)
                .then(_noop)
        );
    }
}

// Lifecycle methods
for(const [name, alias] of ALIASES) {
    Component.prototype[name] = function() {
        return this[alias](...arguments);
    };
    Component.prototype[alias] = function() {
        return true;
    };
}

/**
 * Consumes and combines one or more context values (does subscribe).
 */
export function Consume({from, children}) {
    return children(_consume(_useContext, from));
}

/**
 * Provides one or more context values.
 */
export function Provide({from, children}) {
    return _provide(from, children);
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

// Module namespace
export const Butter = {Component, Consume, Provide, context, prop};
