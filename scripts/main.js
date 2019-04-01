const API = {}
const LANGUAGE = 'en';
function main() {
    API.poke = new PokeApi();
    document.body.querySelector('#submit').addEventListener('click', simpleSearch);
}
async function simpleSearch(e) {
    e.target.classList.add('is-loading')
    let poke_out = new Pokemon(document.body.querySelector('#output'))
    poke_out.data.id = document.body.querySelector('#id_input').value;
    await poke_out.init();
    e.target.classList.remove('is-loading');
}
function filterByLang(arr){
    return arr.filter(a => { return a.language.name === LANGUAGE })
}
function findByLang(arr){
    return arr.find(a => { return a.language.name === LANGUAGE })
}
document.addEventListener("DOMContentLoaded", main);