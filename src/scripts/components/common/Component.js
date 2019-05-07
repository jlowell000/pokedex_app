/**
 * Parent Class to all Components
 */
export default class Component {
    /**
     * At Bare minimum, Components need to know where they are in the dom.
     * @param {Element} ele 
     */
    constructor(ele) {
        this.ele = ele;
        this.state = {};
        this.childComponents = new Array();
    }
    /**
     * Merge a new state into Component.
     * @param {*} state 
     */
    setState(state) {
        Object.assign(this.state, state)
    }
    async init() {
        await this.initChildern();
        return this;
    }
    initChildern() {
        return Promise.all(this.childComponents.map(c => { return c.init(); }));
    }
    template() {
        return ``;
    }
}