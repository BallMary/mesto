export default class Section {
    constructor({items, renderer }, containerSelector) {
        this._items = items;
        this._rendererItems = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(item => this._rendererItems(item));
    }

    addItem(element) {
        this._container.prepend(element);
    }
}