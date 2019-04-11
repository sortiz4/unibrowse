import {States} from 'components';
import {Component, React} from 'core/react';

export class AsyncComponent extends Component {
    static LOADING = 1;
    static SUCCESS = 2;
    static FAILURE = 3;

    _status = 0;

    get loading() {
        return this._status === this.constructor.LOADING;
    }

    get success() {
        return this._status === this.constructor.SUCCESS;
    }

    get failure() {
        return this._status === this.constructor.FAILURE;
    }

    get message() {
        return this._message;
    }

    set loading(value) {
        this._status = value ? this.constructor.LOADING : 0;
        this.message = value;
    }

    set success(value) {
        this._status = value ? this.constructor.SUCCESS : 0;
        this.message = value;
    }

    set failure(value) {
        this._status = value ? this.constructor.FAILURE : 0;
        this.message = value;
    }

    set message(value) {
        if(value instanceof Error) {
            this._message = value.message;
            console.error(value);
        } else {
            this._message = typeof value === 'string' ? (
                value
            ) : (
                undefined
            );
        }
    }

    render() {
        return this.failure ? (
            <States.Error message={this.message}/>
        ) : (
            <States.Loading/>
        );
    }
}
