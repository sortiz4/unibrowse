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

/**
 * Caches the result of a method call.
 */
export function memoize({key, kind, descriptor, ...other}) {
	const [slot, value] = descriptor.value ? (
	    ['value', descriptor.value]
    ) : (
	    ['get', descriptor.get]
    );
    if(kind !== 'method' || typeof value !== 'function') {
		throw new TypeError('Only getters and methods can be memoized');
	}
	return {
        key,
        kind,
        descriptor: {
            ...descriptor,
            [slot]: function(...args) {
                const result = value.call(this, ...args);
                Object.defineProperty(this, key, {
                    ...descriptor,
                    [slot]: function() {
                        return result;
                    },
                });
                return result;
            },
        },
	    ...other,
    };
}
