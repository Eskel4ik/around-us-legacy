export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector(".popup_visible");
            this.close();
        }
    }
    open() {
        this._popup.classList.add('popup_visible');
    }
    close() {
        this._popup.classList.remove('popup_visible');
    }
    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }
}