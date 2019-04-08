import Pokemon from './pokemon'

import PokeApi from '../services/api'

export default class Pokedex {
    constructor(ele) {
        this.ele = ele;
    }
    async init() {
        this.ele.innerHTML = this.template();
        this.ele.querySelector('#submit').addEventListener('click', this.simpleSearch.bind(this));
        this.ele.querySelector('#id_input').addEventListener('keypress', this.enterClick.bind(this));
        this.initPokemonList();
    }
    async simpleSearch() {
        let btn = this.ele.querySelector('#submit').classList;
        btn.add('is-loading')
        let p = new Pokemon(this.ele.querySelector('#output'))
        let value = this.validateInput();
        if (value) {
            p.data.id = value;
            await p.init();
        }
        btn.remove('is-loading');
    }

    async initPokemonList() {
        let api = new PokeApi();
        let list = await api.cmn.get(`${api.pokeapi}pokemon?limit=1`);
        list = await api.cmn.get(`${api.pokeapi}pokemon?limit=${list.count}`);
        this.pokemonList = list.results.map(p => { return p.name });
        this.ele.querySelector('#pokemon_list').innerHTML = this.pokemonList.map(p => { return `<option value='${`${p.charAt(0).toUpperCase()}${p.slice(1)}`}'></option>` }).join('');

    }
    validateInput() {
        let val = this.ele.querySelector('#id_input').value;
        let numVal = parseInt(val);
        if (0 < numVal && numVal < this.pokemonList.length) {
            return numVal;
        } else if (this.pokemonList.includes(val.toLowerCase())) {
            return val.toLowerCase();
        }
        return false;
    }
    enterClick(e) {
        if (e.keyCode == 13) {
            this.simpleSearch();
        }
    }
    template() {
        return `<section class='section'>
                    <div class='container'>
                        <span class='level'>
                            <input class='input' list='pokemon_list' id='id_input' placeholder='Enter Pokemon Name or Number'/>
                            <datalist id='pokemon_list'></datalist>
                            <button class='button' id='submit'>Submit</button>
                        </span>
                        <span id='output'></span>
                    </div>
                </section>`
    }
}