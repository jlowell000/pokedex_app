import PokeApi from '../services/api'
import { findByLang } from '../services/util'
import Component from './Component';

export default class VersionSelector extends Component {
    constructor(ele, ) {
        super(ele);
    }
    async init() {
        let api = new PokeApi();
        this.versions = (await api.getAllVersions()).results
        this.versions = await Promise.all(this.versions.map(v => { return api.getVersion(v.name) }))

        this.ele.innerHTML = this.template();
        this.ele.querySelector('select').addEventListener('change', this.onChange.bind(this));

        return super.init();
    }
    onChange(e) {
        this.state.onChangeCallBack(this.versions.find(v => { return v.name === e.target.selectedOptions[0].value }))
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