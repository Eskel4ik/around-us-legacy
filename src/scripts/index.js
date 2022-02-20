//imports
import "../pages/index.css";

import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
    pageSettings,
    initialCards,
    galleryWindow,
    cardTemplate,
    editForm,
    editButton,
    addCardButton,
    popupTypeProfile,
    popupTypeAddCard,
    popupTypeImage,
    inputName,
    userName,
    inputInfo,
    userInfo,
    addCardForm
} from "./constants.js";

const popupEditProfile = new PopupWithForm(popupTypeProfile, handleProfileFormSubmit);
popupEditProfile.setEventListeners();

const popupAddCardForm = new PopupWithForm(popupTypeAddCard, handleAddCardFormSubmit);
popupAddCardForm.setEventListeners();

const popupImage = new PopupWithImage(popupTypeImage);
popupImage.setEventListeners();

const initialGallery = new Section({
    items: initialCards,
    renderer: (item) => {
        initialGallery.addItem(createCard({ item }));
    }
}, galleryWindow);
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
            data: item,
            handleCardClick: (evt) => {
                popupImage.open(evt);
            }
        },
        cardTemplate);
    const cardElement = card.generateCard();
    return cardElement;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    userInfoInstance.setUserInfo(popupEditProfile._getInputValues());
    popupEditProfile.close();
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const getValues = popupAddCardForm._getInputValues();
    const item = { name: `${getValues.title}`, link: `${getValues.url}` };
    galleryWindow.prepend(createCard({ item }));
    addCardForm.reset();
    popupAddCardForm.close();
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