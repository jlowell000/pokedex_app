import PokeApi from '../services/api'

import { findByLang } from '../services/util'

export default class Type {
    constructor(ele, type) {
        this.ele = ele;
        this.type = type
    }
    async init() {
        this.type = await new PokeApi().getType(this.type.name);
        this.ele.innerHTML = this.template();
        return true;
    }
    template() {
        return `<span>${findByLang(this.type.names).name}</span>`
    }
}