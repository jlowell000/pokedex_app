import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Pokedex from './scripts/components/pokedex';
import REQUEST_CACHE from './scripts/services/api';

document.addEventListener("DOMContentLoaded", () => {
    if (!REQUEST_CACHE) { console.log('REQUEST_CACHE missing') }
    let p = new Pokedex(document.querySelector('#pokedex'));
    p.init();
});