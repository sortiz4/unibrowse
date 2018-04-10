/**
 * Correctly initializes the attributes of an instance (bug fix).
 */
function patch(parent, instance) {
    instance.__proto__ = parent.prototype;
    instance.name = parent.name;
}

/**
 * An exception that occurs when a something has not been implemented.
 */
export class NotImplementedError extends Error {
    constructor(message) {
        super(message);
        patch(NotImplementedError, this);
    }
}

/**
 * An exception that occurs when something is not found.
 */
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        patch(NotFoundError, this);
    }
}

/**
 * An exception that occurs when an invalid state has been reached.
 */
export class StateError extends Error {
    constructor(message) {
        super(message);
        patch(StateError, this);
    }
}
