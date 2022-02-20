export default class Section {
    constructor({ items, renderer }, windowSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = windowSelector;
    }

    addItem(element) {
        this._container.append(element);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}