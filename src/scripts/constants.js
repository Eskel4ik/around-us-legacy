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

export const initialCards = [{
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
const addCardButton = document.querySelector('.user__add-button');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeAddCard = document.querySelector('.popup_type_addCard');
const popupTypeImage = document.querySelector('.popup_type_image');
const inputName = document.querySelector('.popup__input_value_name');
const userName = document.querySelector('.user__name');
const inputInfo = document.querySelector('.popup__input_value_about');
const userInfo = document.querySelector('.user__info');
const addCardForm = document.querySelector('.popup__form-addCard');

export { galleryWindow, cardTemplate, editForm, editButton, addCardButton, popupTypeProfile, popupTypeAddCard, popupTypeImage, inputName, userName, inputInfo, userInfo, addCardForm };