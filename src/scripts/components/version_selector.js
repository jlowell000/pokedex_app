import PokeApi from '../services/api'
import { filterByLang, findByLang, findByVersion } from '../services/util'

export default class VersionSelector {
    constructor(ele, flavorTextEntries, onChangeCallBack) {
        this.ele = ele;
        this.flavorTextEntries = filterByLang(flavorTextEntries);
        this.onChangeCallBack = onChangeCallBack;
    }
    async init() {
        let api = new PokeApi();
        this.versions = await Promise.all(this.flavorTextEntries.map(f => { return api.getVersion(f.version.name) }))
        this.ele.innerHTML = this.template();
        this.ele.querySelector('select').addEventListener('change', this.onChange.bind(this));
        return true;
    }
    onChange(e) {
        this.onChangeCallBack(this.versions.find(v => { return v.name === e.target.selectedOptions[0].value }))
    }
    template() {
        return `<div class="select">
                    <select>
                    <option>Select Version</option>
                        ${this.versions.map(v => { return `<option value='${v.name}'>${findByLang(v.names).name}</option>` }).join('')}
                    </select>
                </div>`
    }
}