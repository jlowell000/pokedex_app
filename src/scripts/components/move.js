import ObjectList from './list'
import Type from './type'

import PokeApi from '../services/api'
import { filterByLang, findByLang, findByVersionGroup, filterByVersionGroup } from '../services/util'

export default class Move {
    constructor(ele, move, origMove, version) {
        this.ele = ele;
        this.move = move;
        this.origMove = origMove;
        this.version = version;
    }
    async init() {
        if (this.version) {
            this.versionDetails = findByVersionGroup(this.origMove.version_group_details, this.version.version_group.name);
            if (this.versionDetails) {
                let api = new PokeApi();
                let res = await Promise.all([await api.getMoveLearnMethod(this.versionDetails.move_learn_method.name), await api.getMove(this.move.name)])
                this.versionDetails.move_learn_method = res[0];
                this.move = res[1];
                this.move.damage_class = await api.getMoveDamageClass(this.move.damage_class.name);
                this.flavor_text = findByVersionGroup(filterByLang(this.move.flavor_text_entries), this.version.version_group.name);
                this.ele.innerHTML = this.template();
                await new Type(this.ele.querySelector(`#${this.move.name}_type`), this.move.type).init();
                return true;
            }
        } else {
            this.ele.innerHTML = `Missing Version`;
        }
    }
    template() {
        return `<section class='section'>
                    <div>
                        <div class='columns'>
                            <span class='column'><strong>${findByLang(this.move.names).name}</strong></span>
                            <span class='column'>Type: <span id='${this.move.name}_type'></span></span>
                            <span class='column is-capitalized'>Class: ${findByLang(this.move.damage_class.names).name}</span>  
                            <span class='column'>Power: ${this.move.power ? this.move.power : '-'}</span>
                            <span class='column'>Accuracy: ${this.move.accuracy ? this.move.accuracy : '-'}</span>
                        </div>
                        <div>${this.flavor_text ? this.flavor_text.flavor_text : '-'}</div>
                        ${this.versionDetails ? this.learnMethodTemplate() : ``}
                    </div>
                </section>`
    }
    learnMethodTemplate() {
        return `<div>Learn Method: ${this.versionDetails.move_learn_method.name === 'level-up' ?
            `Learned at level ${this.versionDetails.level_learned_at}`
            : findByLang(this.versionDetails.move_learn_method.descriptions).description}</div>`
    }
}

class MoveList {
    constructor(ele, moveList, version) {
        this.ele = ele;
        this.moveList = moveList.filter(m => { return !!findByVersionGroup(m.version_group_details, version.version_group.name) });
        this.version = version;
        this.objList = new ObjectList(this.ele, this.moveList.map(m => { return new Move(null, m.move, m, this.version) }))
    }
    async init() {
        this.objList.init();
    }
}

export { Move, MoveList }