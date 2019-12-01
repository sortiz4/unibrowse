const ACCEPTED = 1;
const REJECTED = 2;
const PENDING = 3;

export class PromiseState {
    _status = 0;

    get didAccept() {
        return this._status === ACCEPTED;
    }

    set didAccept(value) {
        this._status = value ? ACCEPTED : 0;
        this.message = value;
    }

    get didReject() {
        return this._status === REJECTED;
    }

    set didReject(value) {
        this._status = value ? REJECTED : 0;
        this.message = value;
    }

    get isPending() {
        return this._status === PENDING;
    }

    set isPending(value) {
        this._status = value ? PENDING : 0;
        this.message = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = (
            value instanceof Error ||
            typeof value === 'string'
        ) ? (
            value
        ) : (
            undefined
        );
    }
}
