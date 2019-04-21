import Type from './type'
import { FlavorText } from './flavor_text'
import { MoveList } from './move'

import PokeApi from '../services/api'
import { filterByLang, findByLang, findByVersion } from '../services/util'

export default class Pokemon {
    constructor(ele) {
        this.ele = ele;
        this.data = {};
        this.show = false;
    }
    async init() {
        if (this.data.id) {
            let api = new PokeApi()
            this.data = await api.getPokemon(this.data.id);
            this.data.species = await api.getSpecies(this.data.species.name);

            this.ele.innerHTML = this.template();

            this.ele.querySelector(`#head_${this.data.id}`).addEventListener('click', this.headClick.bind(this))

            this.ele.querySelector(`#types_${this.data.id}`).innerHTML = this.data.types.reverse()
                .map(t => { return `<span id='types_${this.data.id}_${t.type.name}'></span>` }).join(' | ')
            let types = this.data.types.reverse()
                .map(t => { return new Type(this.ele.querySelector(`#types_${this.data.id}_${t.type.name}`), t.type) })
                .map(t => { return t.init() });

            this.ele.querySelectorAll('nav .panel-heading').forEach(ele => ele.addEventListener('click', this.tabClick.bind(this)));

            await Promise.all(types);
            return true;
        }
    }
    headClick() {
        if (!this.show) {
            this.ele.querySelector(`#body_${this.data.id}`).style.display = 'block';
            this.show = !this.show;
        } else {
            this.ele.querySelector(`#body_${this.data.id}`).style.display = 'none';
            this.show = !this.show;
        }
    }
    initVersionedData() {
        this[`flavor_text_${this.data.id}`] = new FlavorText(this.ele.querySelector(`#flavor_text_${this.data.id}`),
            findByVersion(filterByLang(this.data.species.flavor_text_entries), this.version.name));
        let p = [this[`flavor_text_${this.data.id}`].init()]

        this[`moves_${this.data.id}`] = new MoveList(this.ele.querySelector(`#moves_${this.data.id}`), this.data.moves, this.version)


        if (this.ele.querySelector(`#moves_${this.data.id}_head`).classList.contains('is-active')) {
            p.push(this[`moves_${this.data.id}`].init())
        }
        return Promise.all(p);
    }
    async onVersionChange(version) {
        this.version = version;
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
                    <section id='head_${this.data.id}' class='panel-heading'>
                        <div class='level'>
                            <div class='level-left'>
                                <span>
                                    <figure class='image is-96x96'><img src='${this.data.sprites.front_default}'></figure>
                                </span>
                                <h1 class='title'>${findByLang(this.data.species.names).name}</h1>
                            </div>
                            <div class='level-right'>
                                <span id='types_${this.data.id}'></span>
                            </div>
                        </div>
                    </section>
                    <span id='body_${this.data.id}' class='panel-block' style='display:none'>
                        <section class='section'>
                            <div id='flavor_text_${this.data.id}'></div>
                        </section>
                        <section class='section'>
                            <nav class='panel' style='display:none'>
                                <p class='panel-heading' id='moves_${this.data.id}_head' controls='#moves_${this.data.id}'>Moves</p>
                                <div id='moves_${this.data.id}' class='panel-block' style='display:none'></div>
                            </nav>
                        </section>
                    </span>
                </div>`
    }
}