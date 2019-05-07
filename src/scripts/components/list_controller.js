import Component from './common/Component'
import Selector from './common/Selector'
import VersionSelector from './version_selector'

export default class ListController extends Component {
    constructor(ele) {
        super(ele);
        this.setState({
            numberOfPages: 1,
            version: null
        });
    }
    async init() {
        this.setState({ pageNumber: Math.trunc(this.state.offset / this.state.limit) })
        if (this.state.numberOfPages) {
            this.ele.innerHTML = this.template();

            let pageSelector = new Selector(this.ele.querySelector('#select_page'));
            pageSelector.setState({
                optionsMap: this.pageoOtions(),
                onChange: this.onPageSelect.bind(this),
                value: this.state.pageNumber,
            });
            this.childComponents.push(pageSelector);

            let versionPicker = new VersionSelector(this.ele.querySelector('#version_picker'));
            versionPicker.setState({ version: this.state.version, onChangeCallBack: this.onVersionChange.bind(this) });
            this.childComponents.push(versionPicker);

            this.ele.querySelector('#select_limit select').addEventListener('change', this.onLimitSelect.bind(this));
            this.ele.querySelector('#left_page').addEventListener('click', () => { this.setoffset(this.state.offset - this.state.limit) });
            this.ele.querySelector('#right_page').addEventListener('click', () => { this.setoffset(this.state.offset + this.state.limit) });

            let burger = this.ele.querySelector('.navbar-burger');
            let menu = this.ele.querySelector('.navbar-menu')
            burger.addEventListener('click', () => {
                let active = 'is-active',
                    isActive = burger.classList.contains(active);
                burger.classList[!isActive ? 'add' : 'remove'](active);
                menu.classList[!isActive ? 'add' : 'remove'](active)
            });

            return super.init();
        }
    }
    onVersionChange(version) {
        this.setState({ version: version })
        this.state.onVersionChange(version)
    }
    onPageSelect(pageNumber) {
        this.setState({
            pageNumber: pageNumber
        });
        this.setoffset((pageNumber) * this.state.limit)
    }
    pageoOtions() {
        return new Map(new Array(this.state.numberOfPages).fill(0).map((v, i) => { return [i, i + 1] }));
    }
    onLimitSelect() {
        this.setState({ limit: parseInt(this.ele.querySelector('#select_limit select').value.trim()) });
        this.state.onOffsetLimitChange(this.state.offset, this.state.limit);
        return this.init();
    }
    setoffset(offset) {
        let max = this.state.numberOfPages * this.state.limit;
        if (offset < 0) {
            offset = 0;
        } else if (offset > max) {
            offset = max;
        }
        this.setState({ offset: offset });
        this.state.onOffsetLimitChange(this.state.offset, this.state.limit);
        return this.init();
    }
    template() {
        return `<nav class='navbar is-fixed-top is-dark'>
                    <div class="navbar-brand">
                    <img src="https://img.icons8.com/color/50/000000/pokeball.png" width="52" height="52">
                    </div>
                    <div class='navbar-menu'>
                        <div class='navbar-end'>
                            <div class='navbar-item'>
                                <button id='left_page' class='button'><i class='fas fa-angle-left'></i></button>
                                <span id='select_page' class='select'></span>
                                <button id='right_page' class='button'><i class='fas fa-angle-right'></i></button>
                            </div>
                            <div class='navbar-item'>
                                <span id='select_limit' class='select'>
                                    <select>
                                        <option value='5'>5</option>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                    </select>
                                </span>
                                <span> Per Page</span>
                            </div>
                            <div class='navbar-item'>
                                <span id='version_picker'></span>
                            </div>
                        </div>
                    </div>
                    <a role='button' class='navbar-burger' aria-label='menu' aria-expanded='false'>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                    </a>
                </nav>`;
    }
}