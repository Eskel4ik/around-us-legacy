import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open({ item }) {
        this._elementPic = this._popup.querySelector('.popup__image');
        this._elementText = this._popup.querySelector('.popup__image-text');
        this._elementPic.src = item.link;
        this._elementPic.alt = `${item.name} photo`;
        this._elementText.textContent = item.name;
        super.open();
    }
}