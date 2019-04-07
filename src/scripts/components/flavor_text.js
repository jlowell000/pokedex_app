import ObjectList from './list'

import PokeApi from '../services/api'
import {findByLang} from '../services/util'

export default class FlavorText {
    constructor(ele, flavorText) {
        this.ele = ele;
        this.flavorText = flavorText;
    }
    async init() {
        this.flavorText.version = await new PokeApi().getVersion(this.flavorText.version.name)
        this.ele.innerHTML = this.template();
    }
    template() {
        return `<div class='columns'>
                    <div class='column is-2'><strong>${findByLang(this.flavorText.version.names).name} Pokedex Entry</strong>:</div>
                    <div class='column'>${this.flavorText.flavor_text}</div>
                </div>`;
    }
}
class FlavorTextList {
    constructor(ele, ftList) {
        this.ele = ele;
        this.ftList = ftList;
        this.objList = new ObjectList(this.ele, this.ftList.map(ft => { return new FlavorText(null, ft) }))
    }
    async init() {
        this.objList.init();
    }
}

export { FlavorText, FlavorTextList }