import {Component} from 'core/butter';
import {bind} from 'core/decorators';
import {React} from 'core/react';
import {Unicode} from 'core/string';

const CODEPOINT = 0;
const LITERAL = 1;
const NAME = 2;

export class Form extends Component {
    field = NAME;
    query = '';

    @bind
    onSelect(event) {
        this.setState({field: Number(event.target.value)});
    }

    @bind
    onType(event) {
        this.setState({query: event.target.value});
    }

    @bind
    onSubmit(event) {
        event.preventDefault();

        // Grab the form inputs
        let {field, query} = this;

        // Transform the query
        if(field === CODEPOINT) {
            // Transform hexadecimal to decimal
            query = Number.parseInt(
                query.trim().replace(/[uU]\+/, ''),
                16,
            );
            if(Number.isNaN(query)) {
                query = '';
            }
        } else if(field === LITERAL) {
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
        field = field === NAME ? (
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
                                value={CODEPOINT}
                                checked={this.field === CODEPOINT}
                                onChange={this.onSelect}
                            />
                            <span>Code point</span>
                        </label>
                        <label>
                            <input
                                name="field"
                                type="radio"
                                value={LITERAL}
                                checked={this.field === LITERAL}
                                onChange={this.onSelect}
                            />
                            <span>Literal</span>
                        </label>
                        <label>
                            <input
                                name="field"
                                type="radio"
                                value={NAME}
                                checked={this.field === NAME}
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
