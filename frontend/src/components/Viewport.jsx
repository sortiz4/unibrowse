import {Component} from 'chimera/react';
import {Fragment} from 'chimera/react';
import {React} from 'chimera/react';
import {Details} from 'components';
import {Error} from 'components';
import {Form} from 'components';
import {Loading} from 'components';
import {NotFound} from 'components';
import {PageButton} from 'components';
import {Panel} from 'components';
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
    async componentDidMount() {
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
    get panel() {
        if(this.state.success) {
            return this.paginator.hasChildren
                ? <Panel paginator={this.paginator} onHover={this.onHover}/>
                : <NotFound/>;
        }
        if(this.state.error) {
            return <Error/>;
        }
        return <Loading/>;
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
                {this.panel}
                <PageButton previous onClick={this.onPrevious}/>
                <PageButton next onClick={this.onNext}/>
                <Details details={this.details}/>
            </Fragment>
        );
    }
}
