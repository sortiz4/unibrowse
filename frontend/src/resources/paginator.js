import {CodePoint} from 'chimera/unicode';
import {Backend} from 'services/api';

export class Paginator {
    constructor() {
        this.backend = new Backend();
        this.index = 1;
        this.page = null;
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
    async update() {
        // This method should be called after construction
        let response = await this.backend.page(this.index);
        this.page = response.data;
        return this;
    }
    async next() {
        if(this.hasNext) {
            this.index += 1;
            await this.update();
        }
        return this;
    }
    async previous() {
        if(this.hasPrevious) {
            this.index -= 1;
            await this.update();
        }
        return this;
    }
    *[Symbol.iterator]() {
        for(let child of this.page.children) {
            yield new CodePoint(child);
        }
    }
}
