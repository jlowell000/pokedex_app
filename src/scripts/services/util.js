
const LANGUAGE = 'en'

function filterByLang(arr) {
    return arr.filter(a => { return a.language.name === LANGUAGE })
}
function findByLang(arr) {
    return arr.find(a => { return a.language.name === LANGUAGE })
}

function filterByVersion(arr, versionName) {
    return arr.filter(a => { return a.version.name === versionName })
}
function findByVersion(arr, versionName) {
    return arr.find(a => { return a.version.name === versionName })
}
function filterByVersionGroup(arr, versionGroupName) {
    return arr.filter(a => { return a.version_group.name === versionGroupName })
}
function findByVersionGroup(arr, versionGroupName) {
    return arr.find(a => { return a.version_group.name === versionGroupName })
}

export { filterByLang, findByLang, filterByVersion, findByVersion, filterByVersionGroup, findByVersionGroup }