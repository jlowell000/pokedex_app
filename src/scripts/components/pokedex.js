import PokemonList from './pokemon_list'

import PokeApi from '../services/api'

export default class Pokedex {
    constructor(ele) {
        this.ele = ele;
    }
    async init() {
        this.ele.innerHTML = this.template();
        this.pokemon_list = new PokemonList(this.ele.querySelector('#output'));
        await this.pokemon_list.init();
        return true;
    }
    template() {
        return `<section class='section'>
                    <span id='output'></span>
                </section>`
    }
}