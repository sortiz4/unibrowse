import { NotImplementedError } from 'core/errors';
import { Rest } from 'core/http';

/**
 * A basic model that maps to a resource.
 */
export class Model {
    /**
     * Defines the request builder of a model.
     */
    static request(...args) {
        return new Rest(this, ...args);
    }

    /**
     * Retrieves all instances of this model.
     */
    static all() {
        throw new NotImplementedError();
    }

    /**
     * Retrieves one instance of this model.
     */
    static one() {
        throw new NotImplementedError();
    }

    /**
     * Assigns the properties to the model.
     */
    constructor(props) {
        Object.assign(this, props);
    }
}
