export default class Card {
    constructor({ item, handleCardClick }, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = item.name;
        this._link = item.link;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        this._element = this._cardSelector
            .querySelector('.gallery__card')
            .cloneNode(true);
        return this._element;
    }
    _handleLikeButton() {
        this._likeButton.classList.toggle('gallery__like-button_active');
    }
    _handleDeleteButton() {
        const card = this._element;
        card.remove();
    }
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeButton();
        });
        this._element.querySelector('.gallery__delete-button').addEventListener('click', () => {
            this._handleDeleteButton();
        });
        this._cardPicture.addEventListener('click', () => this._handleCardClick({
            name: this._name,
            link: this._link
        }));
    }
    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.gallery__like-button');
        this._cardPicture = this._element.querySelector('.gallery__picture');
        this._setEventListeners();
        this._element.querySelector('.gallery__text').textContent = this._name;
        this._cardPicture.src = this._link;
        this._cardPicture.alt = this._name;
        return this._element;
    }
}