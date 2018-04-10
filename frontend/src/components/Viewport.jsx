import {Component} from 'chimera/react';
import {Fragment} from 'chimera/react';
import {React} from 'chimera/react';
import {Details} from 'components';
import {Error} from 'components';
import {Form} from 'components';
import {Loading} from 'components';
import {PageButton} from 'components';
import {Panel} from 'components';
import {Paginator} from 'resources/paginator';

export class Viewport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            success: null,
        };
        this.details = null;
        this.paginator = new Paginator();
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.update = this.update.bind(this);
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
                this.setState({success: true});
            } catch(exc) {
                this.setState({error: true});
            }
        }
    }
    get panel() {
        if(this.state.success) {
            return <Panel paginator={this.paginator} event={this.update}/>;
        } else if(this.state.error) {
            return <Error/>;
        }
        return <Loading/>;
    }
    success() {
        this.setState({
            error: false,
            success: true,
        });
    }
    error() {
        this.setState({
            error: true,
            success: false,
        });
    }
    update(details = null) {
        this.details = details;
        this.setState({});
    }
    render() {
        return (
            <Fragment>
                <Form/>
                {this.panel}
                <PageButton previous onClick={this.onPrevious}/>
                <PageButton next onClick={this.onNext}/>
                <Details details={this.details}/>
            </Fragment>
        );
    }
}
