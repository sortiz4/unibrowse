import {Component} from 'chimera/react';
import {React} from 'chimera/react';
import {Literal} from 'components';

export class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
        this.onHover = this.onHover.bind(this);
    }
    onHover() {
        if(!this.state.hover) {
            this.props.update(this.props.code);
        } else {
            this.props.update();
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
