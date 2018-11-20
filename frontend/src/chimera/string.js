import {camelCase, snakeCase} from 'chimera/lodash';
export {camelCase, snakeCase};

/**
 * Joins the arguments and trims the surrounding whitespace.
 */
export function classNames(...args) {
    return args.filter(s => typeof s === 'string' && s.length > 0).join(' ');
}

/**
 * Recursively transforms keys to camel case.
 */
export function camelize(source) {
    if(source instanceof Array) {
        return source.map(camelize);
    } else if(source instanceof Object) {
        const clone = {};
        for(let [key, value] of Object.entries(source)) {
            if(typeof key === 'string') {
                key = camelCase(key);
            }
            clone[key] = camelize(value);
        }
        return clone;
    }
    return source;
}

/**
 * Recursively transforms keys to snake case.
 */
export function snakeize(source) {
    if(source instanceof Array) {
        return source.map(snakeize);
    } else if(source instanceof Object) {
        const clone = {};
        for(let [key, value] of Object.entries(source)) {
            if(typeof key === 'string') {
                key = snakeCase(key);
            }
            clone[key] = snakeize(value);
        }
        return clone;
    }
    return source;
}
