import Pokemon from './pokemon'
import PokeApi from '../services/api'
import Component from './common/Component';
import ListController from './list_controller';

export default class PokemonList extends Component {
    constructor(ele) {
        super(ele);
        this.setState({
            offset: 0,
            limit: 5,
            version: null
        })
    }
    async init() {
        
        this.toggleControls(true)
        let api = new PokeApi();
        let list = await api.getPokemonList(this.state.offset, this.state.limit);
        if (!this.ele.innerHTML) {
            this.ele.innerHTML = this.template();
        }
        this.toggleControls(true)
        let listEle = this.ele.querySelector('#list');
        listEle.innerHTML = '';
        if (!this.pokemonArr) {
            this.pokemonArr = new Array(list.count);
        }
        let listController = new ListController(this.ele.querySelector('#list_controller'));
        listController.setState({
            offset: this.state.offset,
            limit: this.state.limit,
            version: this.state.version,
            onOffsetLimitChange: this.onOffsetLimitChange.bind(this),
            numberOfPages: Math.trunc(this.pokemonArr.length / this.state.limit),
            onVersionChange: this.onVersionChange.bind(this)
        });
        listController.init();

        this.displayedPokemon = new Array(list.results.length);
        listEle.innerHTML = list.results.map(p => { return `<li id='poke_${p.name}'></li>` }).join('');
        for (let i = this.state.offset; i < this.state.offset + this.state.limit && i < this.pokemonArr.length; i++) {
            if (!this.pokemonArr[i]) {
                this.pokemonArr[i] = list.results[i - this.state.offset];
            }
            this.displayedPokemon[i - this.state.offset] = new Pokemon(listEle.querySelector(`#poke_${this.pokemonArr[i].name}`));
            this.displayedPokemon[i - this.state.offset].setState({ data: { id: this.pokemonArr[i].name } });
        }

        await Promise.all(this.displayedPokemon.map(p => { return p.init() }));
        if (this.state.version) {
            await this.onVersionChange(this.state.version)
        }
        this.toggleControls(false)
    }
    onOffsetLimitChange(offset, limit) {
        this.setState({
            offset: offset,
            limit: limit
        });
        this.init();
    }
    async onVersionChange(version) {
        this.setState({ version: version })
        await Promise.all(this.displayedPokemon.map(p => { return p.onVersionChange(version) }))
        return true;
    }

    toggleControls(lock) {
        this.ele.querySelectorAll('#left_page, #right_page, select').forEach(ele => ele[lock ? 'setAttribute' : 'removeAttribute']('disabled', true))
    }
    template() {
        return `<span id='list_controller'></span>
                <section class='section box'>
                    <div class='container'>
                        <ul id='list'></ul>
                    </div>
                </section>`;
    }

}