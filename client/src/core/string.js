import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
export {camelCase, snakeCase};

/**
 * Joins the arguments and trims the surrounding whitespace.
 */
export function classNames(...args) {
    return args.filter(s => typeof s === 'string' && s.length > 0).join(' ');
}

/**
 * Recursively transforms keys.
 */
function mapKeys(map, input) {
    if(typeof input === 'object' && input !== null) {
        if(input instanceof Array) {
            return input.map(v => mapKeys(map, v));
        } else {
            const output = {};
            for(const k in input) {
                if(input.hasOwnProperty(k)) {
                    output[map(k)] = mapKeys(map, input[k]);
                }
            }
            return output;
        }
    }
    return input;
}

/**
 * Recursively transforms keys to camel case.
 */
export function camelCaseKeys(source) {
    return mapKeys(camelCase, source);
}

/**
 * Recursively transforms keys to snake case.
 */
export function snakeCaseKeys(source) {
    return mapKeys(snakeCase, source);
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
