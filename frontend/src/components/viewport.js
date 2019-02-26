import {
    AsyncComponent,
    Details,
    Form,
    NotFound,
    PageButton,
    Panel,
} from 'components';
import {bind} from 'core/decorators';
import {CodePoint} from 'core/models';
import {Fragment, React} from 'core/react';

export class Viewport extends AsyncComponent {
    index = 1;
    search = {};

    afterMount() {
        this.onRequest();
    }

    afterCatch(exc) {
        this.setState({failure: exc});
    }

    @bind
    onNext() {
        if(this.page.hasNext) {
            this.onChange(this.index + 1, this.search);
        }
    }

    @bind
    onPrevious() {
        if(this.page.hasPrevious) {
            this.onChange(this.index - 1, this.search);
        }
    }

    @bind
    onSubmit(search) {
        this.onChange(1, search);
    }

    onChange(index, search) {
        this.onRequest(
            request => request.search({page: index, ...search}),
            {index, search},
        );
    }

    async onRequest(handler, updater) {
        if(typeof handler !== 'function') {
            handler = request => request;
        }
        if(typeof updater !== 'object') {
            updater = {};
        }
        try {
            const request = CodePoint.objects().paginate();
            const page = await handler(request).get();
            this.setState({
                success: true,
                page: page,
                ...updater,
            });
        } catch(exc) {
            this.setState({failure: exc});
        }
    }

    @bind
    onHover(details) {
        this.setState({details});
    }

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit}/>
                {this.success ? (
                    this.page.children.length > 0 ? (
                        <Panel
                            page={this.page}
                            onHover={this.onHover}
                        />
                    ) : (
                        <NotFound/>
                    )
                ) : (
                    super.render()
                )}
                <PageButton previous onClick={this.onPrevious}/>
                <PageButton next onClick={this.onNext}/>
                <Details details={this.details}/>
            </Fragment>
        );
    }
}
