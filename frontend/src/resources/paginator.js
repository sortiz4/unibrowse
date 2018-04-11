import {CodePoint} from 'models/codepoint';
import {Backend} from 'services/api';

export class Paginator {
    constructor() {
        // Underlying data source
        this.backend = new Backend();
        this.page = null;

        // Search parameters
        this.field = null;
        this.query = null;
        this.index = 1;
    }
    get pageNumber() {
        return this.index;
    }
    get pageCount() {
        return this.page['page_count'];
    }
    get hasNext() {
        return this.page['has_next'];
    }
    get hasPrevious() {
        return this.page['has_previous'];
    }
    async sync() {
        // This method should be called after construction
        let response = await this.backend.page(this.index);
        this.page = response.data;
        return this;
    }
    async next() {
        if(this.hasNext) {
            this.index += 1;
            await this.sync();
        }
        return this;
    }
    async previous() {
        if(this.hasPrevious) {
            this.index -= 1;
            await this.sync();
        }
        return this;
    }
    *[Symbol.iterator]() {
        for(let child of this.page.children) {
            yield new CodePoint(child);
        }
    }
}
