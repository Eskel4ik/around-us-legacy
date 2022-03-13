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
        this._item = item;
    }
    _countLike() {
        if (this._likes.length < 1) {
            this._likeCounter.textContent = "";
        } else {
            this._likeCounter.textContent = this._likes.length;
        }
    }
    updateLike(res) {
        this._likeCounter.textContent = res.likes.length;
        this._likeButton.classList.toggle('gallery__like-button_active');
        if (this._likeCounter.textContent == 0) {
            this._likeCounter.textContent = "";
        }
    }
    _checkInitialLike(data) {
        if (this._likes.some(item => item._id == data._id)) {
            this._likeButton.classList.add('gallery__like-button_active');
        }
    }
    _compareID(data) {
        this._deleteButton = this._element.querySelector('.gallery__delete-button');
        if (this._ownerId !== data._id) {
            this._deleteButton.style.display = 'none';
        }
    }
    _getTemplate() {
        this._element = this._templateSelector
            .querySelector('.gallery__card')
            .cloneNode(true);
        return this._element;
    }
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            const isLiked = this._likeButton.classList.contains('gallery__like-button_active');
            this._handleLikeClick(this, isLiked);
        });
        this._element.querySelector('.gallery__delete-button').addEventListener('click', () => {
            this._handleDeleteClick(this);
        });
        this._cardPicture.addEventListener('click', () => this._handleCardClick({
            name: this._name,
            link: this._link
        }));
    }
    removeCard() {
        this._element.remove();
    }
    generateCard(data) {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.gallery__like-button');
        this._cardPicture = this._element.querySelector('.gallery__picture');
        this._likeCounter = this._element.querySelector('.gallery__like-counter');
        this._setEventListeners();
        this._compareID(data);
        this._checkInitialLike(data);
        this._countLike();
        this._element.querySelector('.gallery__text').textContent = this._name;
        this._cardPicture.src = this._link;
        this._cardPicture.alt = this._name;
        return this._element;
    }
}