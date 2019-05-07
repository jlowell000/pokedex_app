import PokeApi from '../services/api'
import Selector from './common/Selector';
import { setLanguage, getLanguage } from '../services/util'

export default class LanguageSelector extends Selector {
    constructor(ele, ) {
        super(ele);
    }
    async init() {
        let api = new PokeApi();
        this.languages = (await api.getLanguageList()).results
        this.languages = await Promise.all(this.languages.map(v => { return api.getLanguage(v.name) }))
        this.setState({
            optionsMap: this.langOptions(),
            value: getLanguage(),
            onChange: this.onLangChange.bind(this)
        });
        return super.init();
    }
    langOptions() {
        return new Map(this.languages.map((v) => {
            let langName = v.names.find(n => { return n.language.name === v.name });
            return [v.name, langName ? langName.name : v.name]
        }));
    }
    onLangChange(l) {
        setLanguage(l);
    }
}