const REQUEST_CACHE = {};

/**
 * Common function if there will be other apis
 */
class CommonApi {
    constructor() { }

    async get(url) {
        if (!REQUEST_CACHE[url]) { REQUEST_CACHE[url] = fetch(url).then(r => { return r.json() }) }
        return REQUEST_CACHE[url];
    }

}
export default class PokeApi extends CommonApi {
    constructor() {
        super();
        this.pokeapi = 'https://pokeapi.co/api/v2/';
    }
    async getLanguage(id){
        return this.get(`${this.pokeapi}language/${id}`)
    }
    async getLanguageList(){
        return this.get(`${this.pokeapi}language`)
    }
    async getPokemon(id) {
        return this.get(`${this.pokeapi}pokemon/${id}/`)
    }
    async getPokemonList(offset, limit) {
        return this.get(`${this.pokeapi}pokemon?offset=${offset}&limit=${limit}`)
    }
    async getSpecies(id) {
        return this.get(`${this.pokeapi}pokemon-species/${id}/`)
    }
    async getAllVersions() {
        return this.get(`${this.pokeapi}version?offset=0&limit=999`)
    }
    async getVersion(id) {
        return this.get(`${this.pokeapi}version/${id}/`)
    }
    async getType(id) {
        return this.get(`${this.pokeapi}type/${id}/`)
    }
    async getMove(id) {
        return this.get(`${this.pokeapi}move/${id}/`)
    }
    async getMoveDamageClass(id) {
        return this.get(`${this.pokeapi}move-damage-class/${id}/`)
    }
    async getMoveLearnMethod(id) {
        return this.get(`${this.pokeapi}move-learn-method/${id}/`)
    }
}
export { CommonApi, PokeApi, REQUEST_CACHE }