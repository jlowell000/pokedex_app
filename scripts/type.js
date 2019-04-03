class Type {
    constructor(ele, type) {
        this.ele = ele;
        this.type = type
    }
    async init() {
        this.type = await API.poke.getType(this.type.name);
        this.ele.innerHTML = this.template();
        return true;
    }
    template() {
        return `<span>${findByLang(this.type.names).name}</span>`
    }
}