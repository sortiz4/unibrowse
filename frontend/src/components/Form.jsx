import {Component} from 'chimera/react';
import {React} from 'chimera/react';
import * as utils from 'chimera/utils';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {query: '', field: 2};
        this.onInput = this.onInput.bind(this);
        this.onRadio = this.onRadio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onInput(event) {
        this.setState({query: event.target.value});
    }
    onRadio(event) {
        this.setState({field: Number(event.target.value)});
    }
    onSubmit(event) {
        event.preventDefault();
        let form = new FormData(event.target);

        // Grab the form inputs
        let input = form.get('query');
        let radio = form.get('field');

        // Compute the filter parameters and apply the filter
        let query, field = radio === '2' ? 'name' : 'value';
        if(radio === '0') {
            // Translate hexadecimal to decimal
            query = Number.parseInt(input.trim().replace(/[uU]\+/, ''), 16);
            if(Number.isNaN(query)) {
                query = '';
            }
        } else if(radio === '1') {
            // Translate literal to decimal
            if(input.length > 0) {
                query = utils.decode(input);
            } else {
                query = '';
            }
        } else {
            // Name-based query
            query = input.trim();
        }
        this.props.onSubmit({field, query});
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <fieldset>
                    <input name="query" placeholder="Search..." type="search"
                           value={this.state.query} onChange={this.onInput}/>
                    <div className="options">
                        <label>
                            <input name="field" type="radio" value="0"
                                   checked={this.state.field === 0}
                                   onChange={this.onRadio}/>
                            <span>Code point</span>
                        </label>
                        <label>
                            <input name="field" type="radio" value="1"
                                   checked={this.state.field === 1}
                                   onChange={this.onRadio}/>
                            <span>Literal</span>
                        </label>
                        <label>
                            <input name="field" type="radio" value="2"
                                   checked={this.state.field === 2}
                                   onChange={this.onRadio}/>
                            <span>Name</span>
                        </label>
                    </div>
                </fieldset>
            </form>
        );
    }
}
