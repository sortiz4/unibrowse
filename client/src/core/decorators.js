/**
 * Lazily binds a class method to an instance.
 */
export function bind({key, kind, placement, descriptor, ...other}) {
    let {value} = descriptor;
    if(
        kind !== 'method' ||
        placement !== 'prototype' ||
        typeof value !== 'function'
    ) {
        throw new TypeError('Only methods can be bound');
    }
    return {
        key,
        kind,
        placement,
        descriptor: {
            get: function() {
                if(
                    this.hasOwnProperty(key) ||
                    typeof value !== 'function'
                ) {
                    return value;
                }
                const bound = value.bind(this);
                Object.defineProperty(this, key, {
                    get: function() {
                        return bound;
                    },
                    set: function(update) {
                        value = update;
                        delete this[key];
                    },
                    configurable: true,
                });
                return bound;
            },
            set: function(update) {
                value = update;
            },
            configurable: true,
        },
        ...other,
    };
}
