import Pokemon from './scripts/components/pokemon'

const LANGUAGE = 'en'

function main() {
    document.body.querySelector('#submit').addEventListener('click', simpleSearch);
}
async function simpleSearch(e) {
    e.target.classList.add('is-loading')
    let poke_out = new Pokemon(document.body.querySelector('#output'))
    poke_out.data.id = document.body.querySelector('#id_input').value;
    await poke_out.init();
    e.target.classList.remove('is-loading');
}

document.addEventListener("DOMContentLoaded", main);

export { LANGUAGE }