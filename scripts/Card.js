//imports 
import { openPopup } from "./utils.js";
import { popupTypeImage, elementPic, elementText } from "./index.js";

//exports
export default class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
    }
    _getTemplate() {
        this._element = this._cardSelector
            .querySelector('.gallery__card')
            .cloneNode(true);
        return this._element;
    }
    _handleLikeButton() {
        const button = this._element.querySelector('.gallery__like-button');
        button.classList.toggle('gallery__like-button_active');
    }
    _handleDeleteButton() {
        const card = this._element;
        card.remove();
    }
    _handleImagePopup(evt) {
        const eventTarget = evt.target;
        elementPic.src = eventTarget.src;
        elementPic.alt = eventTarget.alt;
        elementText.textContent = this._name;
        openPopup(popupTypeImage);
    }
    _setEventListeners() {
        this._element.querySelector('.gallery__like-button').addEventListener('click', () => {
            this._handleLikeButton();
        });
        this._element.querySelector('.gallery__delete-button').addEventListener('click', () => {
            this._handleDeleteButton();
        });
        this._element.querySelector('.gallery__picture').addEventListener('click', (evt) => {
            this._handleImagePopup(evt);
        });
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.gallery__picture').src = `${this._link}`;
        this._element.querySelector('.gallery__text').textContent = this._name;
        this._element.querySelector('.gallery__picture').alt = `${this._name} photo`;
        return this._element;
    }
}