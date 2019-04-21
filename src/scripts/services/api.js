const REQUEST_CACHE = {};

class CommonApi {
    constructor() { }

    async get(url) {
        if (!REQUEST_CACHE[url]) { REQUEST_CACHE[url] = fetch(url).then(r => { return r.json() }) }
        return REQUEST_CACHE[url];
    }

}
export default class PokeApi {
    constructor() {
        this.cmn = new CommonApi();
        this.pokeapi = 'https://pokeapi.co/api/v2/';
    }

    async getPokemon(id) {
        return this.cmn.get(`${this.pokeapi}pokemon/${id}/`)
    }
    async getPokemonList(offset, limit) {
        return this.cmn.get(`${this.pokeapi}pokemon?offset=${offset}&limit=${limit}`)
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
    async getMoveDamageClass(id) {
        return this.cmn.get(`${this.pokeapi}move-damage-class/${id}/`)
    }
    async getMoveLearnMethod(id) {
        return this.cmn.get(`${this.pokeapi}move-learn-method/${id}/`)
    }
}

export { CommonApi, PokeApi, REQUEST_CACHE }