import {Http} from 'chimera/http';
import * as url from 'chimera/url';
import * as settings from 'settings';

export class Backend {
    constructor() {
        this.path = url.join(settings.API_URL, 'codepoints');
    }
    async page(page) {
        return await Http.get(this.path, {
            params: {page},
        });
    }
    async search(page, query, field) {
        return await Http.get(this.path, {
            params: {page, query, field},
        });
    }
}
