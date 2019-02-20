import {NotFoundError} from 'core/errors';

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
