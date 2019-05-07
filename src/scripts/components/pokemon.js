import Type from './type'
import { FlavorText } from './flavor_text'
import { MoveList } from './move'

import PokeApi from '../services/api'
import { filterByLang, findByLang, findByVersion } from '../services/util'
import Component from './common/Component';

export default class Pokemon extends Component {
    constructor(ele) {
        super(ele);
        this.state.date = {};
        this.state.show = false;
    }
    async init() {
        if (this.state.data.id) {
            let api = new PokeApi()
            this.state.data = await api.getPokemon(this.state.data.id);
            this.state.data.species = await api.getSpecies(this.state.data.species.name);

            this.ele.innerHTML = this.template();

            this.ele.querySelector(`#head_${this.state.data.id}`).addEventListener('click', this.headClick.bind(this))

            this.ele.querySelector(`#types_${this.state.data.id}`).innerHTML = this.state.data.types.reverse()
                .map(t => { return `<span id='types_${this.state.data.id}_${t.type.name}'></span>` }).join(' | ')
            let types = this.state.data.types.reverse()
                .map(t => {
                    let type = new Type(this.ele.querySelector(`#types_${this.state.data.id}_${t.type.name}`), t.type);
                    type.setState({ type: t.type });
                    return type;
                })
                .map(t => { return t.init() });

            this.ele.querySelectorAll('nav .panel-heading').forEach(ele => ele.addEventListener('click', this.tabClick.bind(this)));

            await Promise.all(types);
            return super.init();
        }
    }
    headClick() {
        if (!this.state.show && this.state.version) {
            this.ele.querySelector(`#body_${this.state.data.id}`).style.display = 'block';
            this.state.show = !this.state.show;
        } else {
            this.ele.querySelector(`#body_${this.state.data.id}`).style.display = 'none';
            this.state.show = !this.state.show;
        }
    }
    initVersionedData() {
        this[`flavor_text_${this.state.data.id}`] = new FlavorText(this.ele.querySelector(`#flavor_text_${this.state.data.id}`));
        this[`flavor_text_${this.state.data.id}`].setState({
            flavorText: findByVersion(
                filterByLang(this.state.data.species.flavor_text_entries),
                this.state.version.name)
        });

        let p = [this[`flavor_text_${this.state.data.id}`].init()]

        this[`moves_${this.state.data.id}`] = new MoveList(this.ele.querySelector(`#moves_${this.state.data.id}`));
        this[`moves_${this.state.data.id}`].setState({ moveList: this.state.data.moves, version: this.state.version })


        if (this.ele.querySelector(`#moves_${this.state.data.id}_head`).classList.contains('is-active')) {
            p.push(this[`moves_${this.state.data.id}`].init())
        }
        return Promise.all(p);
    }
    async onVersionChange(version) {
        this.state.version = version;
        this.ele.querySelector('nav').style.display = 'block';
        await this.initVersionedData();
    }
    tabClick(e) {
        if (!e.target.classList.contains('is-active')) {
            this.tabClear();
            e.target.classList.add('is-active');
            this.ele.querySelector(e.target.getAttribute('controls')).style.display = 'block';
            if (!this.ele.querySelector(e.target.getAttribute('controls')).innerHTML) {
                this[e.target.getAttribute('controls').replace('#', '')].init()
            }
        } else {
            this.tabClear();
        }
    }
    tabClear() {
        this.ele.querySelectorAll('nav .panel-heading').forEach(ele => ele.classList.remove('is-active'))
        this.ele.querySelectorAll('nav .panel-block').forEach(ele => ele.style.display = 'none')
    }
    template() {
        return `<div class='panel'>
                    <section id='head_${this.state.data.id}' class='panel-heading'>
                        <div class='level'>
                            <div class='level-left'>
                                <span>
                                    <figure class='image is-96x96'><img src='${this.state.data.sprites.front_default}'></figure>
                                </span>
                                <h1 class='title'>${findByLang(this.state.data.species.names).name}</h1>
                            </div>
                            <div class='level-right'>
                                <span id='types_${this.state.data.id}'></span>
                            </div>
                        </div>
                    </section>
                    <span id='body_${this.state.data.id}' class='panel-block' style='display:none'>
                        <section class='section'>
                            <div id='flavor_text_${this.state.data.id}'></div>
                        </section>
                        <section class='section'>
                            <nav class='panel box is-paddingless' style='display:none'>
                                <p class='panel-heading' id='moves_${this.state.data.id}_head' controls='#moves_${this.state.data.id}'>Moves</p>
                                <div id='moves_${this.state.data.id}' class='panel-block' style='display:none'></div>
                            </nav>
                        </section>
                    </span>
                </div>`
    }
}