import {Icon} from 'chimera/icons';
import {Component} from 'chimera/react';
import {React} from 'chimera/react';
import {range} from 'chimera/utils';
import {Container} from 'components';
import {Header} from 'components';
import {Fragment} from "react";

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
        this.details = null;
        this.update = this.update.bind(this);
    }
    update(details) {
        this.details = details;
        this.setState({});
    }
    render() {
        return (
            <Fragment>
                <Panel event={this.update}/>
                <div className="page-left">
                    <h6>
                        <Icon icon="chevron-left"/>
                    </h6>
                </div>
                <div className="page-right">
                    <h6>
                        <Icon icon="chevron-right"/>
                    </h6>
                </div>
                <Details details={this.details}/>
            </Fragment>
        );
    }
}

class Details extends Component {
    render() {
        if(this.props.details) {
            return (
                <div className="details">
                    <dl>
                        <dt>Block</dt>
                        <dd>Basic Latin</dd>
                    </dl>
                    <dl>
                        <dt>Category</dt>
                        <dd>Uppercase Letter</dd>
                    </dl>
                    <dl>
                        <dt>Combining Class</dt>
                        <dd>Not Reordered</dd>
                    </dl>
                    <dl>
                        <dt>Bidirectional Class</dt>
                        <dd>Left-to-right</dd>
                    </dl>
                    <dl>
                        <dt>Decomposition Class</dt>
                        <dd>Canonical</dd>
                    </dl>
                </div>
            );
        }
        return null;
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
        this.onHover = this.onHover.bind(this);
    }
    onHover() {
        if(!this.state.hover) {
            this.props.event(true);
        } else {
            this.props.event(null);
        }
        this.setState({hover: !this.state.hover});
    }
    render() {
        return (
            <div className="card"
                 onMouseEnter={this.onHover}
                 onMouseLeave={this.onHover}>
                <div className="card-header">
                    <h4 dangerouslySetInnerHTML={{__html: '&#47;'}}/>
                    <dl className="card-subheader">
                        <dt>U+9024F</dt>
                        <dd>START OF HEADING</dd>
                    </dl>
                </div>
            </div>
        );
    }
}

class Panel extends Component {
    rows() {
        let rows = [];
        for(let i of range(128)) {
            rows.push(<Card key={i} event={this.props.event}/>);
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
