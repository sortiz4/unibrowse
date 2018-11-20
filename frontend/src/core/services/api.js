import {Http} from 'core/http';

export class Backend {
    constructor() {
        this.path = '/api/codepoints/';
    }

    async all({index: page}) {
        return await Http.get(this.path, {params: {page}});
    }

    async filter({index: page, field, query}) {
        return await Http.get(this.path, {params: {page, field, query}});
    }
}
