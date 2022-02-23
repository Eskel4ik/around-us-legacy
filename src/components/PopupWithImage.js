import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open({ name, link }) {
        this._elementPic = this._popup.querySelector('.popup__image');
        this._elementText = this._popup.querySelector('.popup__image-text');
        this._elementPic.src = link;
        this._elementPic.alt = `${name} photo`;
        this._elementText.textContent = name;
        super.open();
    }
}