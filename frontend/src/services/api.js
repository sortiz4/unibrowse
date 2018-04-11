import {Http} from 'chimera/http';
import * as url from 'chimera/url';
import * as settings from 'settings';

export class Backend {
    constructor() {
        this.path = url.join(settings.API_URL, 'codepoints');
    }
    async all({index: page}) {
        return await Http.get(this.path, {
            params: {page},
        });
    }
    async filter({index: page, field, query}) {
        return await Http.get(this.path, {
            params: {page, field, query},
        });
    }
}
