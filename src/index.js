import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Pokedex from './scripts/components/pokedex';

document.addEventListener("DOMContentLoaded", ()=> {
    let p = new Pokedex(document.querySelector('#pokedex'));
    p.init();
});