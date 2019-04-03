import { LANGUAGE } from '../../index'

function filterByLang(arr) {
    return arr.filter(a => { return a.language.name === LANGUAGE })
}
function findByLang(arr) {
    return arr.find(a => { return a.language.name === LANGUAGE })
}

export { filterByLang, findByLang }