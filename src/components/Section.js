export default class Section {
    constructor({renderer}, containerSelector) {
        this._rendererItems = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => this._rendererItems(item));
    }

    addInitialCards(element) {
        this._container.append(element);
      }

    addItem(element) {
        this._container.prepend(element);
    }
}