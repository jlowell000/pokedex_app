class FlavorText {
    constructor(ele, species) {
        this.ele = ele;
        this.species = species;
    }
    async init() {
        this.species = await API.poke.getSpecies(this.species.id ? this.species.id : this.species.name ? this.species.name : '');
        let versionArr = await Promise.all(filterByLang(this.species.flavor_text_entries).map(f => { return API.poke.getVersion(f.version.name) }))
        versionArr.forEach(v => { this.species.flavor_text_entries.filter(f => { return f.version.name === v.name }).forEach(f => f.version = v); });
        this.ele.innerHTML = this.template();
    }
    template() {
        return `<ul>${this.flavorTextList()}</ul>`;
    }
    flavorTextList() {
        return filterByLang(this.species.flavor_text_entries)
            .sort((a, b) => { return a.version.id - b.version.id })
            .map(f => { return `<li><strong>${findByLang(f.version.names).name}</strong>: ${f.flavor_text}</li>` }).join('')
    }
}