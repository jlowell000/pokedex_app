class Pokemon {
    constructor(ele) {
        this.ele = ele;
        this.data = {};
        if (this.ele.getAttribute('data-num')) {
            this.data.id = this.ele.getAttribute('data-num');
            this.init();
        }
    }
    async init() {
        if (this.data.id) {
            this.data = await API.poke.getPokemon(this.data.id);
            this.data.species = await API.poke.getSpecies(this.data.id);

            this.ele.innerHTML = this.template();

            this.ele.querySelector(`#types_${this.data.id}`).innerHTML = this.data.types.reverse()
                .map(t => { return `<span id='types_${this.data.id}_${t.type.name}'></span>` }).join(' | ')
            this.data.types.reverse()
                .map(t => { return new Type(this.ele.querySelector(`#types_${this.data.id}_${t.type.name}`), t.type) })
                .forEach(t => t.init());

            this[`moves_${this.data.id}`] = new MoveList(this.ele.querySelector(`#moves_${this.data.id}`), this.data.moves)

            this[`flavor_text_${this.data.id}`] = new FlavorText(this.ele.querySelector(`#flavor_text_${this.data.id}`), this.data.species);
            this.ele.querySelectorAll('nav .panel-heading').forEach(ele => ele.addEventListener('click', this.tabClick.bind(this)))
        }
    }
    tabClick(e) {
        if (!e.target.classList.contains('is-active')) {
            this.tabClear();
            e.target.classList.add('is-active');
            this.ele.querySelector(e.target.getAttribute('controls')).style.display = 'block';
            this[e.target.getAttribute('controls').replace('#', '')].init()
        } else {
            this.tabClear();
        }
    }
    tabClear() {
        this.ele.querySelectorAll('nav .panel-heading').forEach(ele => ele.classList.remove('is-active'))
        this.ele.querySelectorAll('nav .panel-block').forEach(ele => ele.style.display = 'none')
    }
    template() {
        return `<div class='box'>
                    <div>
                        <div class='level'>
                            <div class='level-left'>
                                <h1 class='level-item title'>${findByLang(this.data.species.names).name}</h1>
                                <span class= 'level-item'>
                                    <figure class='image is-96x96'><img src='${this.data.sprites.front_default}'></figure>
                                </span>
                                <span id='types_${this.data.id}'></span>
                            </div>
                        </div>
                        <nav class='panel'>
                            <p class='panel-heading' controls='#flavor_text_${this.data.id}'>Flavor Text</p>
                            <div id='flavor_text_${this.data.id}' class='panel-block' style='display:none'></div>

                            <p class='panel-heading' controls='#moves_${this.data.id}'>Moves</p>
                            <div id='moves_${this.data.id}' class='panel-block' style='display:none'></div>
                        </nav>
                    </div>
                </div>`
    }
}