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
        return `<div id=${id} class='columns'><i class='column fas fa-spinner fa-pulse fa-3x'/></i></div>`
    }
    template() {
        return `${this.spinner('list_spin')}<ul class='is-invisible'>${this.objList.map((v, i) => { return `<li id='obj_${i}' style='border-top:solid;'></li>` }).join('')}</ul>`;
    }
}