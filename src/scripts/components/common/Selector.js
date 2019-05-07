import Component from "./Component";

export default class Selector extends Component {
    constructor(ele) {
        super(ele);
    }
    async init() {
        this.ele.innerHTML = this.template();
        this.ele.querySelector('select').addEventListener('change', this.onChange.bind(this));
        if (this.state.value) {
            this.ele.querySelector('select').value = this.state.value;
        }
        return super.init();
    }
    onChange() {
        this.setState({ value: this.ele.querySelector('select').value });
        if (this.state.onChange) {
            this.state.onChange(this.state.value);
        }
    }
    template() {
        let o = ''
        this.state.optionsMap.forEach((value, key) => {
            o += `<option value='${key}'>${value}</option>`
        });
        return `<select>${o}</select>`;
    }
}