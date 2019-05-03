import Component from "./Component";

export default class ObjectList extends Component {
    constructor(ele) {
        super(ele);
    }
    async init() {
        this.ele.innerHTML = this.template();
        this.childComponents.forEach((o, i) => {
            o.ele = this.ele.querySelector(`#obj_${i}`);
        });

        await super.init();

        this.ele.querySelector('#list_spin').remove();
        this.ele.querySelector('ul').classList.remove('is-invisible');
    }
    spinner(id) {
        return `<div id=${id} class='columns'><i class='column fas fa-spinner fa-pulse fa-3x'/></i></div>`
    }
    template() {
        return `${this.spinner('list_spin')}<ul class='is-invisible'>${this.childComponents.map((v, i) => { return `<li id='obj_${i}' style='border-top:solid;'></li>` }).join('')}</ul>`;
    }
}