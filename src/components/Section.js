export default class Section {
    constructor({items, renderer }, containerSelector) {
        this._items = items;
        this._renderedItems = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(data) {
        data.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._container.prepend(element);
    }
}