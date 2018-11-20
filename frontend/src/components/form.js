import {Component, React} from 'core/react';
import * as utils from 'core/utils';

export class Form extends Component {
    static CODEPOINT = 0x00;
    static LITERAL = 0x01;
    static NAME = 0x02;

    constructor(props) {
        super(props);
        this.state = {field: Form.NAME, query: ''};
        this.onField = this.onField.bind(this);
        this.onQuery = this.onQuery.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onField(event) {
        this.setState({field: Number(event.target.value)});
    }

    onQuery(event) {
        this.setState({query: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();

        // Grab the form inputs
        let field = this.state.field;
        let query = this.state.query;

        // Transform the query
        if(field === Form.CODEPOINT) {
            // Transform hexadecimal to decimal
            query = Number.parseInt(
                query.trim().replace(/[uU]\+/, ''),
                16,
            );
            if(Number.isNaN(query)) {
                query = '';
            }
        } else if(field === Form.LITERAL) {
            // Transform literal to decimal
            if(query.length > 0) {
                query = utils.decode(query);
            } else {
                query = '';
            }
        } else {
            // Trim name-based queries
            query = query.trim();
        }

        // Transform the field
        field = field === Form.NAME ? 'name' : 'value';

        // Apply the filter
        this.props.onSubmit({field, query});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <fieldset>
                    <input
                        name="query"
                        type="search"
                        placeholder="Search..."
                        value={this.state.query}
                        onChange={this.onQuery}
                    />
                    <div className="options">
                        <label>
                            <input
                                name="field"
                                type="radio"
                                value={Form.CODEPOINT}
                                checked={this.state.field === Form.CODEPOINT}
                                onChange={this.onField}
                            />
                            <span>Code point</span>
                        </label>
                        <label>
                            <input
                                name="field"
                                type="radio"
                                value={Form.LITERAL}
                                checked={this.state.field === Form.LITERAL}
                                onChange={this.onField}
                            />
                            <span>Literal</span>
                        </label>
                        <label>
                            <input
                                name="field"
                                type="radio"
                                value={Form.NAME}
                                checked={this.state.field === Form.NAME}
                                onChange={this.onField}
                            />
                            <span>Name</span>
                        </label>
                    </div>
                </fieldset>
            </form>
        );
    }
}
