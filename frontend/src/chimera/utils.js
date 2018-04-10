import {NotFoundError} from 'chimera/errors';

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
