import {CodePoint} from 'core/models';
import {Backend} from 'core/services';

export class Paginator {
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
    
    get hasChildren() {
        return this.page.children.length > 0;
    }

    constructor() {
        // Underlying data source
        this.backend = new Backend();
        this.page = null;

        // Filter parameters
        this.field = null;
        this.query = null;
        this.index = 1;

        // Backend state
        this.state = {filter: false};
    }

    async sync() {
        // This method should be called after construction
        const response = this.state.filter ? (
            await this.backend.filter(this)
        ): (
            await this.backend.all(this)
        );
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

    async filter({field, query}) {
        // Disable the filter if the query is empty
        this.state.filter = query.length !== 0;

        // Reset the page if the field or query has changed
        if(this.field !== field || this.query !== query) {
            this.field = field;
            this.query = query;
            this.index = 1;

            // Resynchronize after changing
            await this.sync();
        }
        return this;
    }

    map(callback) {
        let index = 0;
        const children = [];
        for(const child of this) {
            children.push(callback(child, index++, children));
        }
        return children;
    }

    *[Symbol.iterator]() {
        for(let child of this.page.children) {
            yield new CodePoint(child);
        }
    }
}
