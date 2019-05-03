import ObjectList from './list'

import PokeApi from '../services/api'
import { findByLang } from '../services/util'
import Component from './Component';

export default class FlavorText extends Component {
    constructor(ele) {
        super(ele);
    }
    async init() {
        if (this.state.flavorText) {
            this.state.flavorText.version = await new PokeApi().getVersion(this.state.flavorText.version.name);
            this.ele.innerHTML = this.template(findByLang(this.state.flavorText.version.names).name, this.state.flavorText.flavor_text);
        } else {
            this.ele.innerHTML = this.template('', 'Not Available')
        }
        return super.init();
    }
    template(name, text) {
        return `<div class='columns'>
                    <div class='column is-2'><strong>${name} Pokedex Entry</strong>:</div>
                    <div class='column'>${text}</div>
                </div>`;
    }
}
class FlavorTextList extends ObjectList {
    constructor(ele) {
        super(ele);
    }
    async init() {
        this.childComponents = this.state.ftList.map(ft => {
            let f = new FlavorText(null);
            f.setState({ flavorText: ft });
            return f;
        });
        return super.init();
    }
}

export { FlavorText, FlavorTextList }