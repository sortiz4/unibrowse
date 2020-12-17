const RESOLVED = 0;
const REJECTED = 1;
const PENDING = 2;
const NONE = 3;

export class ObservableState {
    _status = NONE;

    get didResolve() {
        return this._status === RESOLVED;
    }

    set didResolve(value) {
        this._status = value ? RESOLVED : NONE;
        this.message = value;
    }

    get didReject() {
        return this._status === REJECTED;
    }

    set didReject(value) {
        this._status = value ? REJECTED : NONE;
        this.message = value;
    }

    get isPending() {
        return this._status === PENDING;
    }

    set isPending(value) {
        this._status = value ? PENDING : NONE;
        this.message = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value instanceof Error || typeof value === 'string' ? (
            value
        ) : (
            undefined
        );
    }
}
