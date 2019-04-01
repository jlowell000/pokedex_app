class CommonApi {
    constructor() {
        if (sessionStorage.commonApiCache) {
            this.cache = JSON.parse(sessionStorage.commonApiCache);
        } else {
            this.cache = {};
        }
    }
    async cachedGet(url) {
        if (!this.cache[url]) {
            this.cache[url] = await (await fetch(url)).json();
            async () => { sessionStorage.commonApiCache = JSON.stringify(this.cache); }
        }
        return this.cache[url];
    }

}
class PokeApi {
    constructor() {
        this.cmn = new CommonApi();
        this.pokeapi = 'https://pokeapi.co/api/v2/';
    }

    async getPokemon(id) {
        return this.cmn.cachedGet(`${this.pokeapi}pokemon/${id}/`)
    }
    async getSpecies(id) {
        return this.cmn.cachedGet(`${this.pokeapi}pokemon-species/${id}/`)
    }
    async getVersion(id) {
        return this.cmn.cachedGet(`${this.pokeapi}version/${id}/`)
    }

}
