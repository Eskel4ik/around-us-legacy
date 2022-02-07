//imports

import { pageSettings } from "./index.js";

export {
    openPopup,
    closePopup,
    escapeButtonHandler
};

function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', escapeButtonHandler);
    const popupSubmitButton = popup.querySelector('.popup__button');
    if (popup.contains(popupSubmitButton)) {
        popupSubmitButton.classList.add(pageSettings.inactiveButtonClass);
        popupSubmitButton.disabled = true;
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', escapeButtonHandler);
}

function escapeButtonHandler(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector(".popup_visible");
        closePopup(openedPopup);
    }
}