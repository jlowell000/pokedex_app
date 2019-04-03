class Move {
    constructor(ele, move) {
        this.ele = ele;
        this.move = move;
    }
    async init() {
        this.move = await API.poke.getMove(this.move.name);
        this.ele.innerHTML = this.template();
        await new Type(this.ele.querySelector(`#${this.move.name}_type`), this.move.type).init();
        return true;
    }
    template() {
        return `<span><strong>${findByLang(this.move.names).name}</strong> <span id='${this.move.name}_type'></span>`
    }
}

class MoveList {
    constructor(ele, moveList) {
        this.ele = ele;
        this.moveList = moveList;
        this.objList = new ObjectList(this.ele ,this.moveList.map(m => { return new Move(null, m.move) }))
    }
    async init() {
        this.objList.init();
    }
}