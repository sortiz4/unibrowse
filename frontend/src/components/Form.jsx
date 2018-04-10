import {Component} from 'chimera/react';
import {React} from 'chimera/react';

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {checked: 2};
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
