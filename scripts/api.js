class CommonApi {
    constructor() { }
    async get(url) { return (await fetch(url)).json(); }

}
class PokeApi {
    constructor() {
        this.cmn = new CommonApi();
        this.pokeapi = 'https://pokeapi.co/api/v2/';
    }

    async getPokemon(id) {
        return this.cmn.get(`${this.pokeapi}pokemon/${id}/`)
    }
    async getSpecies(id) {
        return this.cmn.get(`${this.pokeapi}pokemon-species/${id}/`)
    }
    async getVersion(id) {
        return this.cmn.get(`${this.pokeapi}version/${id}/`)
    }
    async getType(id) {
        return this.cmn.get(`${this.pokeapi}type/${id}/`)
    }
    async getMove(id) {
        return this.cmn.get(`${this.pokeapi}move/${id}/`)
    }

}
