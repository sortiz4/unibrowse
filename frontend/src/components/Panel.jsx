import {Component} from 'chimera/react';
import {React} from 'chimera/react';
import {Card} from 'components';

export class Panel extends Component {
    get rows() {
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
                {this.rows}
            </div>
        );
    }
}

