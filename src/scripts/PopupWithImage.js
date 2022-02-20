import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._elementPic = popupSelector.querySelector('.popup__image');
        this._elementText = popupSelector.querySelector('.popup__image-text');
    }
    open(evt) {
        super.open();
        const eventTarget = evt.target;
        this._elementPic.src = eventTarget.src;
        this._elementPic.alt = eventTarget.alt;
        this._elementText.textContent = eventTarget.alt;
    }
    close() {
        super.close();
    }
    setEventListeners() {
        super.setEventListeners();

    }
}