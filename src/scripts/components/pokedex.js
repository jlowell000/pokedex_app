import Pokemon from './pokemon'

export default class Pokedex {
    constructor(ele) {
        this.ele = ele;
    }
    async init() {
        this.ele.innerHTML = this.template();
        this.ele.querySelector('#submit').addEventListener('click', this.simpleSearch.bind(this));
    }
    async simpleSearch(e) {
        let btn = this.ele.querySelector('#submit').classList;
        btn.add('is-loading')
        let p = new Pokemon(this.ele.querySelector('#output'))
        p.data.id = this.ele.querySelector('#id_input').value;
        await p.init();
        btn.remove('is-loading');
    }
    template() {
        return `<section class='section'>
                    <div class='container'>
                        <span class='level'>
                            <input class='input' id='id_input' type='number' />
                            <button class='button' id='submit'>Submit</button>
                        </span>
                        <span id='output'></span>
                    </div>
                </section>`
    }
}