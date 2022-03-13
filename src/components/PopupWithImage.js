import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._elementPic = this._popup.querySelector('.popup__image');
        this._elementText = this._popup.querySelector('.popup__image-text');
    }
    open({ name, link }) {
        this._elementPic.src = link;
        this._elementPic.alt = `${name} photo`;
        this._elementText.textContent = name;
        super.open();
    }
}