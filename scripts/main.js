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
function filterByLang(arr) {
    return arr.filter(a => { return a.language.name === LANGUAGE })
}
function findByLang(arr) {
    return arr.find(a => { return a.language.name === LANGUAGE })
}
document.addEventListener("DOMContentLoaded", main);

function spinner(id){
    return `<span id=${id}><i class='fas fa-spinner fa-pulse fa-3x'/></i></span>`
}

class ObjectList {
    constructor(ele, objList) {
        this.ele = ele;
        this.objList = objList;
    }
    async init() {
        this.ele.innerHTML = this.template();
        this.objList.forEach((o, i) => { o.ele = this.ele.querySelector(`#obj_${i}`) });
        await Promise.all(this.objList.map(o => { return o.init() }))
        this.ele.querySelector('#list_spin').innerHTML = '';
        this.ele.querySelector('ul').classList.remove('is-invisible')
    }
    template() {
        return `${spinner('list_spin')}<ul class='is-invisible'>${this.objList.map((v, i) => { return `<li id='obj_${i}'></li>` }).join('')}</ul>`;
    }
}