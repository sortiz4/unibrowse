import {default as camelCase} from 'lodash/camelCase';
import {default as snakeCase} from 'lodash/snakeCase';
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
export function camelCaseKeys(source) {
    if(source instanceof Array) {
        return source.map(camelCaseKeys);
    } else if(source instanceof Object) {
        const clone = {};
        for(const key in source) {
            if(source.hasOwnProperty(key)) {
                clone[camelCase(key)] = camelCaseKeys(source[key]);
            }
        }
        return clone;
    }
    return source;
}

/**
 * Recursively transforms keys to snake case.
 */
export function snakeCaseKeys(source) {
    if(source instanceof Array) {
        return source.map(snakeCaseKeys);
    } else if(source instanceof Object) {
        const clone = {};
        for(const key in source) {
            if(source.hasOwnProperty(key)) {
                clone[snakeCase(key)] = snakeCaseKeys(source[key]);
            }
        }
        return clone;
    }
    return source;
}

/**
 * A small collection of Unicode shortcuts.
 */
export class Unicode {
    static fromString(string) {
        let number = 0;
        for(const char of string) {
            number += char.codePointAt(0);
        }
        return number;
    }
}
