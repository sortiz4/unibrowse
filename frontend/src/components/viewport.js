import {Component, Fragment, React} from 'chimera/react';
import {
    Details,
    Error,
    Form,
    Loading,
    NotFound,
    PageButton,
    Panel,
} from 'components';
import {Paginator} from 'resources/paginator';

export class Viewport extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false, success: false};
        this.paginator = new Paginator();
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onHover = this.onHover.bind(this);
    }

    async afterMount() {
        try {
            await this.paginator.sync();
            this.success();
        } catch(exc) {
            this.error();
        }
    }

    async onNext() {
        if(this.paginator.hasNext) {
            try {
                await this.paginator.next();
                this.success();
            } catch(exc) {
                this.error();
            }
        }
    }

    async onPrevious() {
        if(this.paginator.hasPrevious) {
            try {
                await this.paginator.previous();
                this.success();
            } catch(exc) {
                this.error();
            }
        }
    }

    async onSubmit(args) {
        try {
            await this.paginator.filter(args);
            this.success();
        } catch(exc) {
            this.error();
        }
    }

    onHover(details) {
        this.details = details;
        this.setState({});
    }

    error() {
        this.setState({
            error: true,
            success: false,
        });
    }

    success() {
        this.setState({
            error: false,
            success: true,
        });
    }

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit}/>
                {this.state.success ? (
                    this.paginator.hasChildren ? (
                        <Panel
                            paginator={this.paginator}
                            onHover={this.onHover}
                        />
                    ) : (
                        <NotFound/>
                    )
                ) : this.state.error ? (
                    <Error/>
                ) : (
                    <Loading/>
                )}
                <PageButton previous onClick={this.onPrevious}/>
                <PageButton next onClick={this.onNext}/>
                <Details details={this.details}/>
            </Fragment>
        );
    }
}
