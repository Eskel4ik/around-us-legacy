//imports

import { pageSettings } from "./index.js";

export {
    openPopup,
    closePopup,
    handleEscapeButton
};

function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', handleEscapeButton);
}

function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', handleEscapeButton);
}

function handleEscapeButton(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector(".popup_visible");
        closePopup(openedPopup);
    }
}