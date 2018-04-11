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
        let input = form.get('query').trim().toLowerCase();
        let radio = form.get('field');

        // Compute the filter parameters and apply the filter
        let field = radio === '2' ? 'name' : 'value';
        let query = radio === '2' ? input : utils.decode(input);
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
