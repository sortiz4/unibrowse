import Http from 'axios';
import {from} from 'core/rx';

/**
 * Ensures all paths begin and end with a slash.
 */
function normalize(source) {
    const slash = '/';
    const path = source instanceof Array ? (
        source.join(slash)
    ) : typeof source === 'string' ? (
        source
    ) : (
        ''
    );
    if (path.length > 0) {
        const doesNotStartWith = !path.startsWith(slash);
        const doesNotEndWith = !path.endsWith(slash);
        return doesNotStartWith && doesNotEndWith ? (
            slash.concat(path, slash)
        ) : doesNotStartWith ? (
            slash + path
        ) : doesNotEndWith ? (
            path + slash
        ) : (
            path
        );
    }
    return slash;
}

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
        for (const value of this.children) {
            yield value;
        }
    }
}

/**
 * Enables programmatic request construction.
 */
export class Request {
    constructor() {
        this._maps = [];
        this._settings = {
            transformRequest: [
                ...Http.defaults.transformRequest,
            ],
            transformResponse: [
                ...Http.defaults.transformResponse,
            ],
        };
    }

    _resolve(response) {
        for (const map of this._maps) {
            response = map(response);
        }
        return response;
    }

    map(closure) {
        this._maps.push(closure);
        return this;
    }

    request(closure) {
        const i = this._settings.transformRequest.length - 1;
        this._settings.transformRequest.splice(i, 0, closure);
        return this;
    }

    response(closure) {
        this._settings.transformResponse.push(closure);
        return this;
    }

    settings(settings) {
        Object.assign(this._settings, settings);
        return this;
    }
}

/**
 * Enables programmatic request construction (REST).
 */
export class Rest extends Request {
    constructor(model, path) {
        super();
        this.path(path);
        this._model = model;
    }

    _resolve(response) {
        // Resolve the response
        response = super._resolve(response);

        // Map the response
        const {status, data} = response;
        return status >= 200 && status < 300 ? (
            (
                !(typeof data === 'string') &&
                !(data instanceof Page)
            ) ? (
                new this._model(data)
            ) : (
                data
            )
        ) : (
            response
        );
    }

    _url() {
        return normalize(this._path);
    }

    path(path) {
        this._path = path;
        return this;
    }

    paginate() {
        const transform = data => data?.children ? (
            new Page(data, this._model)
        ) : (
            data
        );
        return this.response(transform);
    }

    search(search) {
        this._settings.params = Object.assign(
            this._settings.params ?? {},
            search,
        );
        return this;
    }
}

// Bodiless HTTP methods
for (const method of ['delete', 'get', 'head', 'options']) {
    Rest.prototype[method] = function() {
        const settings = {
            method,
            url: this._url(),
            ...this._settings,
        };
        return from(Http.request(settings).then(r => this._resolve(r)));
    };
}

// Bodied HTTP methods
for (const method of ['patch', 'post', 'put']) {
    Rest.prototype[method] = function(data) {
        const settings = {
            data,
            method,
            url: this._url(),
            ...this._settings,
        };
        return from(Http.request(settings).then(r => this._resolve(r)));
    };
}
