import {Http} from 'chimera/http';
import * as url from 'chimera/url';
import * as settings from 'settings';

export class Backend {
    constructor() {
        this.path = url.join(settings.API_URL, 'codepoints');
    }
    get(value) {
        let path = url.join(this.path, value);
        return Http.get(path);
    }
    page(number) {
        return Http.get(this.path, {
            params: {
                page: number,
            },
        });
    }
    search(type, query) {
        return Http.get(this.path, {
            params: {
                type,
                query,
            },
        });
    }
}
