import PokeApi from '../services/api'

import { findByLang } from '../services/util'
import Component from './common/Component';

export default class Type extends Component {
    constructor(ele) {
        super(ele);
    }
    async init() {
        this.state.type = await new PokeApi().getType(this.state.type.name);
        this.ele.innerHTML = this.template();
        return super.init();
    }
    template() {
        return `<span>${findByLang(this.state.type.names).name}</span>`
    }
}