import {States} from 'components';
import {Component} from 'core/butter';
import {React} from 'core/react';

export class AsyncComponent extends Component {
    static ACCEPTED = 1;
    static REJECTED = 2;
    static PENDING = 3;

    _status = 0;

    get didAccept() {
        return this._status === this.constructor.ACCEPTED;
    }

    set didAccept(value) {
        this._status = value ? (
            this.constructor.ACCEPTED
        ) : (
            0
        );
        this.message = value;
    }

    get didReject() {
        return this._status === this.constructor.REJECTED;
    }

    set didReject(value) {
        this._status = value ? (
            this.constructor.REJECTED
        ) : (
            0
        );
        this.message = value;
    }

    get isPending() {
        return this._status === this.constructor.PENDING;
    }

    set isPending(value) {
        this._status = value ? (
            this.constructor.PENDING
        ) : (
            0
        );
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

    render() {
        return this.didReject ? (
            <States.Error message={this.message}/>
        ) : (
            <States.Loading/>
        );
    }
}
