import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._form.querySelector('.popup__button');
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }
    getInputValues() {
        this._data = {};
        this._inputList.forEach((input) => {
            this._data[input.name] = input.value;
        })
        return this._data;
    }
    openWithData(data) {
        super.open();
        if (data) {
            this._data = data;
        }
    }
    close(buttonText = 'Save') {
        this._button.textContent = buttonText;
        super.close();
        this._form.reset();
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            this._button.textContent = "Saving...";
            evt.preventDefault();
            this._handleSubmit(this._data);
        });
    }
}