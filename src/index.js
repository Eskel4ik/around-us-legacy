//imports
import "./pages/index.css";

import Card from "./components/Card.js";
import FormValidator from "./components/formValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {
    pageSettings,
    initialCards
} from "./components/utils/constants.js";

//variables

const galleryWindow = document.querySelector('.gallery');
const cardTemplate = document.querySelector("#card-template").content;
const editForm = document.querySelector('.popup__form-profile');
const editButton = document.querySelector('.user__edit-button');
const addCardButton = document.querySelector('.user__add-button');
const inputName = document.querySelector('.popup__input_value_name');
const userName = document.querySelector('.user__name');
const inputInfo = document.querySelector('.popup__input_value_about');
const userInfo = document.querySelector('.user__info');
const addCardForm = document.querySelector('.popup__form-addCard');

//class instances

const popupEditProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupEditProfile.setEventListeners();

const popupAddCardForm = new PopupWithForm('.popup_type_addCard', handleAddCardFormSubmit);
popupAddCardForm.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const initialGallery = new Section({
    items: initialCards,
    renderer: (item) => {
        initialGallery.addItem(createCard({ item }));
    }
}, '.gallery');
initialGallery.renderItems();

const userInfoInstance = new UserInfo({ userName, userInfo });

//validators

const popupAddCard = new FormValidator(pageSettings, addCardForm);
popupAddCard.enableValidation();

const popupProfile = new FormValidator(pageSettings, editForm);
popupProfile.enableValidation();

//functions

function createCard({ item }) {
    const card = new Card({
            item,
            handleCardClick: () => {
                popupImage.open({ item });
            }
        },
        cardTemplate);
    const cardElement = card.generateCard();
    return cardElement;
}

function handleProfileFormSubmit() {
    userInfoInstance.setUserInfo(popupEditProfile._getInputValues());
}

function handleAddCardFormSubmit() {
    const getValues = popupAddCardForm._getInputValues();
    const item = { name: getValues.title, link: getValues.url };
    galleryWindow.prepend(createCard({ item }));
    addCardForm.reset();
}

//event listeners

editButton.addEventListener('click', () => {
    popupProfile.resetValidation();
    popupEditProfile.open();
    const userActualInfo = userInfoInstance.getUserInfo();
    inputName.value = userActualInfo.name;
    inputInfo.value = userActualInfo.about;
});

addCardButton.addEventListener('click', () => {
    popupAddCard.resetValidation();
    popupAddCardForm.open();

});