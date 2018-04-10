import {Icon} from 'chimera/icons';
import {Component} from 'chimera/react';
import {Fragment} from 'chimera/react';
import {React} from 'chimera/react';
import {Container} from 'components';
import {Header} from 'components';
import {Paginator} from 'resources';

export function App() {
    return (
        <Container>
            <Header>
                <h2>Unibrowse</h2>
                <h5>The unicode browser</h5>
            </Header>
            <Form/>
            <Viewport/>
        </Container>
    );
}

class Viewport extends Component {
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
            await this.paginator.update();
            this.setState({success: true});
        } catch(exc) {
            this.setState({error: true});
        }
    }
    async onNext() {
        if(this.paginator.hasNext) {
            try {
                await this.paginator.next();
                this.setState({success: true});
            } catch(exc) {
                this.setState({error: true});
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
    update(details) {
        this.details = details;
        this.setState({});
    }
    panel() {
        if(this.state.success) {
            return <Panel paginator={this.paginator} event={this.update}/>;
        }
        return null;
    }
    render() {
        return (
            <Fragment>
                {this.panel()}
                <a className="page-left" onClick={this.onPrevious}>
                    <h6>
                        <Icon icon="chevron-left"/>
                    </h6>
                </a>
                <a className="page-right" onClick={this.onNext}>
                    <h6>
                        <Icon icon="chevron-right"/>
                    </h6>
                </a>
                <Details details={this.details}/>
            </Fragment>
        );
    }
}

function Details({details}) {
    if(details) {
        return (
            <div className="details">
                <dl>
                    <dt>Block</dt>
                    <dd>{details.block}</dd>
                </dl>
                <dl>
                    <dt>Category</dt>
                    <dd>{details.category}</dd>
                </dl>
                <dl>
                    <dt>Combining Class</dt>
                    <dd>{details.combiningClass}</dd>
                </dl>
                <dl>
                    <dt>Bidirectional Class</dt>
                    <dd>{details.bidirectionalClass}</dd>
                </dl>
                <dl>
                    <dt>Decomposition Class</dt>
                    <dd>{details.decompositionClass}</dd>
                </dl>
            </div>
        );
    }
    return null;
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
        this.onHover = this.onHover.bind(this);
    }
    onHover() {
        if(!this.state.hover) {
            this.props.event(this.props.code);
        } else {
            this.props.event(null);
        }
        this.setState({hover: !this.state.hover});
    }
    render() {
        let {code} = this.props;
        return (
            <div className="card"
                 onMouseEnter={this.onHover}
                 onMouseLeave={this.onHover}>
                <div className="card-header">
                    <h4 dangerouslySetInnerHTML={{__html: `&#${code.key};`}}/>
                    <dl className="card-subtitle">
                        <dt>{code.value}</dt>
                        <dd>{code.name}</dd>
                    </dl>
                </div>
            </div>
        );
    }
}

class Panel extends Component {
    rows() {
        let rows = [];
        for(let code of this.props.paginator) {
            rows.push(
                <Card key={code.key} code={code}
                      event={this.props.event}/>
            );
        }
        return rows;
    }
    render() {
        return (
            <div className="panel">
                {this.rows()}
            </div>
        );
    }
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: 2,
        };
        this.onRadio = this.onRadio.bind(this);
    }
    onRadio(event) {
        this.setState({checked: Number(event.target.value)});
    }
    render() {
        return (
            <form>
                <fieldset>
                    <input name="search" placeholder="Search..." type="search"/>
                    <div className="options">
                        <label>
                            <input name="type" type="radio" value="0"
                                   checked={this.state.checked === 0}
                                   onChange={this.onRadio}/>
                            <span>Code point</span>
                        </label>
                        <label>
                            <input name="type" type="radio" value="1"
                                   checked={this.state.checked === 1}
                                   onChange={this.onRadio}/>
                            <span>Literal</span>
                        </label>
                        <label>
                            <input name="type" type="radio" value="2"
                                   checked={this.state.checked === 2}
                                   onChange={this.onRadio}/>
                            <span>Name</span>
                        </label>
                    </div>
                </fieldset>
            </form>
        );
    }
}
