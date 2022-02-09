//imports

import {
    openPopup,
    closePopup
} from "./utils.js"

import Card from "./card.js";
import FormValidator from "./formValidator.js";

//exports

export { popupTypeImage, elementPic, elementText };

//page settings

export const pageSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_active"
};

//Initial cards data

const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

//variables

const galleryWindow = document.querySelector('.gallery');
const cardTemplate = document.querySelector("#card-template").content;
const editForm = document.querySelector('.popup__form-profile');
const editButton = document.querySelector('.user__edit-button');
const closeEditButton = document.querySelector('.popup__close-button_type_edit');
const addCardButton = document.querySelector('.user__add-button');
const closeAddButton = document.querySelector('.popup__close-button_type_addCard');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeAddCard = document.querySelector('.popup_type_addCard');
const popupTypeImage = document.querySelector('.popup_type_image');
const closeImageButton = document.querySelector('.popup__close-button_type_image');
const inputName = document.querySelector('.popup__input_value_name');
const userName = document.querySelector('.user__name');
const inputInfo = document.querySelector('.popup__input_value_about');
const userInfo = document.querySelector('.user__info');
const popupElements = document.querySelectorAll('.popup');
const addCardForm = document.querySelector('.popup__form-addCard');
const elementPic = document.querySelector('.popup__image');
const elementText = document.querySelector('.popup__image-text');
const inputTitle = document.querySelector('.popup__input_value_title');
const inputUrl = document.querySelector('.popup__input_value_url');

//validators

const popupAddCard = new FormValidator(pageSettings, addCardForm);
popupAddCard.enableValidation();

const popupProfile = new FormValidator(pageSettings, editForm);
popupProfile.enableValidation();

//functions

function createCard(item) {
    const card = new Card(item, cardTemplate);
    const cardElement = card.generateCard();
    return cardElement;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    closePopup(popupTypeProfile);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardData = {
        name: `${inputTitle.value}`,
        link: `${inputUrl.value}`
    };
    const cardElement = createCard(cardData);
    galleryWindow.prepend(cardElement);
    addCardForm.reset();
    closePopup(popupTypeAddCard);
}

//event listeners

editButton.addEventListener('click', () => {
    popupProfile.resetValidation();
    openPopup(popupTypeProfile);
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
});

closeEditButton.addEventListener('click', () => {
    closePopup(popupTypeProfile);
});

addCardButton.addEventListener('click', () => {
    popupAddCard.resetValidation();
    openPopup(popupTypeAddCard);

});

closeAddButton.addEventListener('click', () => {
    closePopup(popupTypeAddCard);
});

closeImageButton.addEventListener('click', () => {
    closePopup(popupTypeImage);
});

popupTypeProfile.addEventListener('submit', handleProfileFormSubmit);

popupTypeAddCard.addEventListener('submit', handleAddCardFormSubmit);

popupElements.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

initialCards.forEach((item) => {
    const cardElement = createCard(item);
    galleryWindow.append(cardElement);
});