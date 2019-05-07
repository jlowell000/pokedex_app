import PokemonList from './pokemon_list'
import { onLanguageChange } from '../services/util'

export default class Pokedex {
    constructor(ele) {
        this.ele = ele;
        onLanguageChange(this.init.bind(this))
    }
    async init() {
        this.ele.innerHTML = this.template();
        this.pokemon_list = new PokemonList(this.ele.querySelector('#output'));
        await this.pokemon_list.init();
        return this;
    }
    template() {
        return `<section class='section has-background-grey-light'>
                    <span id='output'></span>
                </section>`
    }
}