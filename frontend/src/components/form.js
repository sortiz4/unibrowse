import {bind} from 'core/decorators';
import {Component, React} from 'core/react';
import {Unicode} from 'core/string';

export class Form extends Component {
    static CODEPOINT = 0;
    static LITERAL = 1;
    static NAME = 2;

    field = Form.NAME;
    query = '';

    @bind
    onSelect(event) {
        const {value} = event.target;
        this.setState(() => this.field = Number(value));
    }

    @bind
    onType(event) {
        const {value} = event.target;
        this.setState(() => this.query = value);
    }

    @bind
    onSubmit(event) {
        event.preventDefault();

        // Grab the form inputs
        let {field, query} = this;

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
            query = query.length > 0 ? (
                Unicode.fromString(query)
            ) : (
                ''
            );
        } else {
            // Trim name-based queries
            query = query.trim();
        }

        // Transform the field
        field = field === Form.NAME ? (
            'name'
        ) : (
            'value'
        );

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
                        value={this.query}
                        onChange={this.onType}
                    />
                    <div className="options">
                        <label>
                            <input
                                name="field"
                                type="radio"
                                value={Form.CODEPOINT}
                                checked={this.field === Form.CODEPOINT}
                                onChange={this.onSelect}
                            />
                            <span>Code point</span>
                        </label>
                        <label>
                            <input
                                name="field"
                                type="radio"
                                value={Form.LITERAL}
                                checked={this.field === Form.LITERAL}
                                onChange={this.onSelect}
                            />
                            <span>Literal</span>
                        </label>
                        <label>
                            <input
                                name="field"
                                type="radio"
                                value={Form.NAME}
                                checked={this.field === Form.NAME}
                                onChange={this.onSelect}
                            />
                            <span>Name</span>
                        </label>
                    </div>
                </fieldset>
            </form>
        );
    }
}
