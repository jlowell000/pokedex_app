export default class ObjectList {
    constructor(ele, objList) {
        this.ele = ele;
        this.objList = objList;
    }
    async init() {
        this.ele.innerHTML = this.template();
        this.objList.forEach((o, i) => { o.ele = this.ele.querySelector(`#obj_${i}`) });
        await Promise.all(this.objList.map(o => { return o.init() }))
        this.ele.querySelector('#list_spin').remove()
        this.ele.querySelector('ul').classList.remove('is-invisible')
    }
    spinner(id) {
        return `<span id=${id}><i class='fas fa-spinner fa-pulse fa-3x'/></i></span>`
    }
    template() {
        return `${this.spinner('list_spin')}<ul class='is-invisible'>${this.objList.map((v, i) => { return `<li id='obj_${i}'></li>` }).join('')}</ul>`;
    }
}