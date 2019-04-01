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
            this.data = await API.poke.getPokemon(this.data.id)
            name
            this.data.species = await API.poke.getSpecies(this.data.id)
            await this.flavorTextInit()
            this.ele.innerHTML = this.template();
        }
    }
    async flavorTextInit() {
        let versionArr = await Promise.all(filterByLang(this.data.species.flavor_text_entries).map(f => { return API.poke.getVersion(f.version.name) }))
        versionArr.forEach(v => {
            this.data.species.flavor_text_entries.filter(f => { return f.version.name === v.name }).forEach(f => f.version = v);
        })
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
                            </div>
                        </div>
                        <div class='content'><ul>${this.flavorTextTemplate()}</ul></div>
                    </div>
                </div>`
    }
    flavorTextTemplate() {
        return filterByLang(this.data.species.flavor_text_entries)
            .sort((a, b) => { return a.version.id - b.version.id })
            .map(f => { return `<li><strong>${findByLang(f.version.names).name}</strong>: ${f.flavor_text}</li>` }).join('')
    }
}