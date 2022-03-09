export default class Card {
    constructor({ item, handleCardClick }, templateSelector, handleDeleteClick, handleLikeClick) {
        this._templateSelector = templateSelector;
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        this._ownerId = item.owner._id;
        this._id = item._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }
    _countLike() {
        if (this._likes.length < 1) {
            this._likeCounter.textContent = "";
        } else {
            this._likeCounter.textContent = this._likes.length;
        }
    }
    compareID(info) {
        this._deleteButton = this._element.querySelector('.gallery__delete-button');
        if (this._ownerId !== info._id) {
            this._deleteButton.style.display = 'none';
        }
    }
    _getTemplate() {
        this._element = this._templateSelector
            .querySelector('.gallery__card')
            .cloneNode(true);
        return this._element;
    }
    _handleLikeButton() {
        this._likeButton.classList.toggle('gallery__like-button_active');
        this._handleLikeClick(this._id);
    }
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeButton();
        });
        this._element.querySelector('.gallery__delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
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
        this._likeCounter = this._element.querySelector('.gallery__like-counter');
        this._setEventListeners();
        this._element.querySelector('.gallery__text').textContent = this._name;
        this._cardPicture.src = this._link;
        this._cardPicture.alt = this._name;
        this._countLike();
        return this._element;
    }
}