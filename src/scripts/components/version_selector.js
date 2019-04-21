import PokeApi from '../services/api'
import { filterByLang, findByLang, findByVersion } from '../services/util'

export default class VersionSelector {
    constructor(ele, onChangeCallBack) {
        this.ele = ele;
        this.onChangeCallBack = onChangeCallBack;
    }
    async init() {
        let api = new PokeApi();
        this.versions = (await api.getAllVersions()).results
        this.versions = await Promise.all(this.versions.map(v => { return api.getVersion(v.name) }))
        this.ele.innerHTML = this.template();
        this.ele.querySelector('select').addEventListener('change', this.onChange.bind(this));
        return true;
    }
    onChange(e) {
        this.onChangeCallBack(this.versions.find(v => { return v.name === e.target.selectedOptions[0].value }))
    }
    getVersion() {
        let s = this.ele.querySelector('select').selectedOptions[0].value;
        return this.versions.find(v => { return v.name === s })
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