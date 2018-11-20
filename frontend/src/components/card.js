import {Literal} from 'components';
import {Component, React} from 'core/react';

export class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
        this.onHover = this.onHover.bind(this);
    }

    onHover() {
        if(!this.state.hover) {
            this.props.onHover(this.props.code);
        } else {
            this.props.onHover(null);
        }
        this.setState({hover: !this.state.hover});
    }

    render() {
        const {code} = this.props;
        return (
            <div
                className="card"
                onMouseEnter={this.onHover}
                onMouseLeave={this.onHover}
            >
                <div className="card-header">
                    <Literal value={code.key}/>
                    <dl className="card-subtitle">
                        <dt>{code.value}</dt>
                        <dd>{code.name}</dd>
                    </dl>
                </div>
            </div>
        );
    }
}