import VersionSelector from './version_selector'
import Pokemon from './pokemon'
import PokeApi from '../services/api'

export default class PokemonList {
    constructor(ele) {
        this.ele = ele;
        this.offset = 0;
        this.limit = 5;
    }
    async init() {


        let api = new PokeApi();
        let list = await api.getPokemonList(this.offset, this.limit);
        if (!this.ele.innerHTML) {
            this.ele.innerHTML = this.template();
            this.controlInit()
        }
        this.toggleControls(true)
        let listEle = this.ele.querySelector('#list');
        listEle.innerHTML = '';

        if (!this.pokemonArr) {
            this.pokemonArr = new Array(list.count);
        }
        this.numberOfPages = Math.trunc(this.pokemonArr.length / this.limit);
        this.ele.querySelector('#select_page').innerHTML = this.pageSelectorTemplate();
        this.ele.querySelector('#select_page select').value = Math.trunc(this.offset / this.limit)
        this.ele.querySelector('#select_page select').addEventListener('change', () => {
            this.offset = parseInt(this.ele.querySelector('#select_page select').value) * this.limit;
            this.init();
        })

        this.displayedPokemon = new Array(list.results.length);
        listEle.innerHTML = list.results.map(p => { return `<li id='poke_${p.name}'></li>` }).join('');
        for (let i = this.offset; i < this.offset + this.limit && i < this.pokemonArr.length; i++) {
            if (!this.pokemonArr[i]) {
                this.pokemonArr[i] = list.results[i - this.offset];
            }
            this.displayedPokemon[i - this.offset] = new Pokemon(listEle.querySelector(`#poke_${this.pokemonArr[i].name}`));
            this.displayedPokemon[i - this.offset].data.id = this.pokemonArr[i].name;
        }

        let data = await api.getPokemon(list.results[0].name);
        data.species = await api.getSpecies(data.species.name);

        if (!this.versionPicker) {
            this.versionPicker = new VersionSelector(this.ele.querySelector('#version_picker'),
                data.species.flavor_text_entries, this.onVersionChange.bind(this));
            await this.versionPicker.init()
        } else {
            this.version = this.versionPicker.getVersion();
        }

        this.ele.querySelector('#select_limit select').value = this.limit;
        let max = this.numberOfPages * this.limit;
        if (this.offset < 0) {
            this.offset = 0;
        } else if (this.offset > max) {
            this.offset = max;
        }
        await Promise.all(this.displayedPokemon.map(p => { return p.init() }));
        if (this.version) {
            await this.onVersionChange(this.version)
        }
        this.toggleControls(false)
    }
    async onVersionChange(version) {
        await Promise.all(this.displayedPokemon.map(p => { return p.onVersionChange(version) }))
        return true;
    }

    controlInit() {
        this.ele.querySelector('#select_limit select').addEventListener('change', () => {
            this.limit = parseInt(this.ele.querySelector('#select_limit select').value.trim())
            this.init();
        })

        this.ele.querySelector('#left_page').addEventListener('click', () => {
            this.offset = this.offset - this.limit
            if (this.offset < 0) {
                this.offset = 0;
            }
            this.init();
        })
        this.ele.querySelector('#right_page').addEventListener('click', () => {
            let max = this.numberOfPages * this.limit;
            this.offset = this.offset + this.limit;
            if (this.offset > max) {
                this.offset = max;
            }
            this.init();
        })
    }
    toggleControls(lock) {
        this.ele.querySelectorAll('#left_page, #right_page, select').forEach(ele => ele[lock ? 'setAttribute' : 'removeAttribute']('disabled', true))
    }
    pageSelectorTemplate() {
        return `<select>${new Array(this.numberOfPages).fill(0).map((v, i) => { return `<option value='${i}'>${i + 1}</option>` }).join('')}</select>`
    }
    template() {
        return `<nav class='navbar is-fixed-top is-danger'>
                    <div class='navbar-menu'>
                        <div class='navbar-end'>
                            <div class='navbar-item'>
                                <button id='left_page' class='button'><i class='fas fa-angle-left'></i></button>
                                <span id='select_page' class='select'></span>
                                <button id='right_page' class='button'><i class='fas fa-angle-right'></i></button>
                            </div>
                            <div class='navbar-item'>
                                <span id='select_limit' class='select'>
                                    <select>
                                        <option value='5'>5</option>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                    </select>
                                </span>
                                <span> Per Page</span>
                            </div>
                            <div class='navbar-item'>
                                <span id='version_picker'></span>
                            </div>
                        </div>
                    </div>
                </nav>
                <section class='section'>
                    <div class='container'>
                        <ul id='list'></ul>
                    </div>
                </section>`;
    }

}