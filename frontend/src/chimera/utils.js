import {NotFoundError} from 'chimera/errors';

/**
 * Encodes an integer to a string with the given radix.
 */
export function encode(integer, radix = 36) {
    return integer.toString(radix);
}

/**
 * Decodes an string to an integer with the given radix.
 */
export function decode(string, radix = 36) {
    return Number.parseInt(string, radix);
}

/**
 * Python-style generator for range iteration.
 */
export function *range(a, b = null, step = 1) {
    let start, stop;
    if(step === 0) {
        throw new RangeError('step must not be zero');
    }
    if(Number.isInteger(b)) {
        [start, stop] = [a, b];
    } else {
        [start, stop] = [0, a];
    }
    if(start > stop) {
        for(let i = start; i > stop; i += step) {
            yield i;
        }
    } else {
        for(let i = start; i < stop; i += step) {
            yield i;
        }
    }
}

/**
 * A small collection of DOM shortcuts.
 */
export class Dom {
    static id(id) {
        let el = document.getElementById(id);
        if(el === null) {
            throw new NotFoundError(`element '#${id}' not found`);
        }
        return el;
    }
}
