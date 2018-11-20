import {NotFoundError} from 'core/errors';

/**
 * Decodes a string to an integer.
 */
export function decode(string) {
    let number = 0;
    for(const char of string) {
        number += char.codePointAt(0);
    }
    return number;
}

/**
 * A small collection of DOM shortcuts.
 */
export class Dom {
    static id(id) {
        const el = document.getElementById(id);
        if(el === null) {
            throw new NotFoundError(`element '#${id}' not found`);
        }
        return el;
    }
}
