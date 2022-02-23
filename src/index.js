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

const cardTemplate = document.querySelector("#card-template").content;
const editForm = document.querySelector('.popup__form-profile');
const editButton = document.querySelector('.user__edit-button');
const addCardButton = document.querySelector('.user__add-button');
const inputName = document.querySelector('.popup__input_value_name');
const inputInfo = document.querySelector('.popup__input_value_about');
const addCardForm = document.querySelector('.popup__form-addCard');

//class instances

const popupEditProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupEditProfile.setEventListeners();

const popupAddCardForm = new PopupWithForm('.popup_type_addCard', handleAddCardFormSubmit);
popupAddCardForm.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const pageGallery = new Section({
    items: initialCards,
    renderer: (item) => {
        pageGallery.addItem(createCard({ item }));
    }
}, '.gallery');
pageGallery.renderItems();

const userInfoInstance = new UserInfo({ userName: '.user__name', userInfo: '.user__info' });

//validators

const popupAddCard = new FormValidator(pageSettings, addCardForm);
popupAddCard.enableValidation();

const popupProfile = new FormValidator(pageSettings, editForm);
popupProfile.enableValidation();

//functions

function createCard({ item }) {
    const card = new Card({
            item,
            handleCardClick: ({ name, link }) => {
                popupImage.open({ name, link });
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
    pageGallery.addItem(createCard({ item }));
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