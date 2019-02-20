import {memoize} from 'core/decorators';
import {NotImplementedError} from 'core/errors';
import {Http} from 'core/http';
import {camelCaseKeys, snakeCaseKeys} from 'core/string';

/**
 * A simple page interface.
 */
export class Page {
    constructor(data, model) {
        Object.assign(this, data);

        // Map the children to the model
        this.children = this.children.map(m => new model(m));
    }

    map(...args) {
        return this.children.map(...args);
    }

    *[Symbol.iterator]() {
        for(const value of this.children) {
            yield value;
        }
    }
}

/**
 * Enables programmatic request construction.
 */
export class RequestBuilder {
    static for(model) {
        return class extends this {
            _resolve(response) {
                // Resolve the response
                response = super._resolve(response);

                // Reduce the response
                const {status, data} = response;
                return status >= 200 && status < 300 ? (
                    (
                        !(typeof data === 'string') &&
                        !(data instanceof Page)
                    ) ? (
                        new model(data)
                    ) : (
                        data
                    )
                ) : (
                    response
                );
            }

            paginate() {
                return super.paginate(model);
            }
        };
    }

    get _url() {
        if(this._path.length > 0) {
            let path = this._path.replace(/:/g, '/');
            if(this._args instanceof Array) {
                for(const value of this._args) {
                    path = path.replace(/{\w+}/, value);
                }
            } else if(this._args !== null) {
                for(const [key, value] of Object.entries(this._args)) {
                    path = path.replace(`{${key}}`, value);
                }
            }
            return `/${path}/`;
        }
        return '';
    }

    constructor(path, ...args) {
        // Main settings
        this._path = path;
        this._args = args;
        this._settings = {
            transformRequest: [
                snakeCaseKeys,
                ...Http.defaults.transformRequest,
            ],
            transformResponse: [
                ...Http.defaults.transformResponse,
                camelCaseKeys,
            ],
        };

        // Additional settings
        this._response = null;
    }

    _resolve(response) {
        return typeof this._response === 'function' ? (
            this._response(response)
        ) : (
            response
        );
    }

    path(path, ...args) {
        this._path = path;
        if(args.length > 0) {
            this.args(...args);
        }
        return this;
    }

    args(...args) {
        if(
            args.length === 1 &&
            typeof args[0] === 'object'
        ) {
            this._args = args[0];
        } else {
            this._args = args;
        }
        return this;
    }

    settings(settings) {
        this._settings = {...this._settings, ...settings};
        return this;
    }

    paginate(model) {
        this._settings
            .transformResponse
            .push(data => new Page(data, model));
        return this;
    }

    search(updater) {
        this._settings.params = {
            ...(this._settings.params || {}),
            ...updater,
        };
        return this;
    }

    response(handler) {
        this._response = handler;
        return this;
    }
}

// Bodiless HTTP methods
for(const method of ['delete', 'get', 'head', 'options']) {
    RequestBuilder.prototype[method] = async function() {
        return this._resolve(
            await Http.request({
                method,
                url: this._url,
                ...this._settings,
            })
        );
    };
}

// Bodied HTTP methods
for(const method of ['patch', 'post', 'put']) {
    RequestBuilder.prototype[method] = async function(data) {
        return this._resolve(
            await Http.request({
                data,
                method,
                url: this._url,
                ...this._settings,
            })
        );
    };
}

/**
 * A basic model that maps to a resource.
 */
export class Model {
    /**
     * Defines the request builder of a model.
     */
    @memoize
    static get request() {
        const builder = RequestBuilder.for(this);
        return new Proxy(builder, {
            apply: function(_0, _1, args) {
                return new builder(...args);
            },
            get: function(_, key) {
                return new builder()[key];
            },
        });
    }

    /**
     * Shorthand constructor accessor.
     */
    get meta() {
        return this.constructor;
    }

    /**
     * Retrieves instances of this model.
     */
    static objects() {
        throw new NotImplementedError();
    }

    /**
     * Assigns the properties to the model.
     */
    constructor(props) {
        Object.assign(this, props);
    }
}
