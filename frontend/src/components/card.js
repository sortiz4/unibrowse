import {Literal} from 'components';
import {bind} from 'core/decorators';
import {Component, React} from 'core/react';

export class Card extends Component {
    hover = false;

    get code() {
        return this.props.code;
    }

    @bind
    onHover() {
        this.props.onHover(!this.hover ? this.code : null);
        this.setState(() => this.hover = !this.hover);
    }

    render() {
        return (
            <div
                className="card"
                onMouseEnter={this.onHover}
                onMouseLeave={this.onHover}
            >
                <div className="card-header">
                    <Literal value={this.code.key}/>
                    <dl className="card-subtitle">
                        <dt>{this.code.value}</dt>
                        <dd>{this.code.name}</dd>
                    </dl>
                </div>
            </div>
        );
    }
}
