/*
 * General Utility functions and constants.
 */
let language = 'en',
    fallBackLang = 'en',
    onLanguageChangeCallbacks = new Array();

function filterByLang(arr) {
    return arr.filter(a => { return a.language.name === language });
}
function findByLang(arr) {
    let o = arr.find(a => { return a.language.name === language });
    console.log(arr, o ? o : arr.find(a => { return a.language.name === fallBackLang }))
    return o ? o : arr.find(a => { return a.language.name === fallBackLang });
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
function onLanguageChange(func) {
    onLanguageChangeCallbacks.push(func);
}
function setLanguage(l) {
    language = l;
    onLanguageChangeCallbacks.forEach(f => {
        f(l);
    });
}
function getLanguage() {
    return language;
}

export { filterByLang, findByLang, filterByVersion, findByVersion, filterByVersionGroup, findByVersionGroup, onLanguageChange, setLanguage, getLanguage }