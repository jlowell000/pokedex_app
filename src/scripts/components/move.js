import ObjectList from './common/list'
import Type from './type'

import PokeApi from '../services/api'
import { filterByLang, findByLang, findByVersionGroup, filterByVersionGroup } from '../services/util'
import Component from './common/Component';

export default class Move extends Component {
    constructor(ele) {
        super(ele);
    }
    async init() {
        if (this.state.version) {
            this.state.versionDetails = findByVersionGroup(this.state.origMove.version_group_details, this.state.version.version_group.name);
            if (this.state.versionDetails) {
                let api = new PokeApi(),
                    res = await Promise.all([await api.getMoveLearnMethod(this.state.versionDetails.move_learn_method.name), await api.getMove(this.state.move.name)]);

                this.state.versionDetails.move_learn_method = res[0];
                this.state.move = res[1];
                this.state.move.damage_class = await api.getMoveDamageClass(this.state.move.damage_class.name);
                this.state.flavor_text = findByVersionGroup(filterByLang(this.state.move.flavor_text_entries), this.state.version.version_group.name);

                this.ele.innerHTML = this.template();

                let t = new Type(this.ele.querySelector(`#${this.state.move.name}_type`));
                t.setState({ type: this.state.move.type })
                await t.init();

                return super.init();
            }
        } else {
            this.ele.innerHTML = `Missing Version`;
        }
    }
    template() {
        return `<section class='section'>
                    <div>
                        <div class='columns'>
                            <span class='column'><strong>${findByLang(this.state.move.names).name}</strong></span>
                            <span class='column'>Type: <span id='${ this.state.move.name}_type'></span></span>
                            <span class='column is-capitalized'>Class: ${findByLang(this.state.move.damage_class.names).name}</span>  
                            <span class='column'>Power: ${ this.state.move.power ? this.state.move.power : '-'}</span>
                            <span class='column'>Accuracy: ${ this.state.move.accuracy ? this.state.move.accuracy : '-'}</span>
                        </div>
                        <div>${ this.state.flavor_text ? this.state.flavor_text.flavor_text : '-'}</div>
                        ${ this.state.versionDetails ? this.learnMethodTemplate() : ``}
                    </div>
                </section>`
    }
    learnMethodTemplate() {
        return `<div>Learn Method: ${this.state.versionDetails.move_learn_method.name === 'level-up' ?
            `Learned at level ${this.state.versionDetails.level_learned_at}`
            : findByLang(this.state.versionDetails.move_learn_method.descriptions).description}</div>`
    }
}

class MoveList extends ObjectList {
    constructor(ele) {
        super(ele);
    }
    async init() {
        this.state.moveList = this.state.moveList.filter(m => { return !!findByVersionGroup(m.version_group_details, this.state.version.version_group.name) });
        this.childComponents = this.state.moveList.map(m => {
            let move = new Move(null)
            move.setState({ move: m.move, origMove: m, version: this.state.version })
            return move;
        });
        return super.init();
    }
}

export { Move, MoveList }