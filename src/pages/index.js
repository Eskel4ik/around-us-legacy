//imports
import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
    pageSettings,
} from "../utils/constants.js";

//variables

const cardTemplate = document.querySelector("#card-template").content;
const editForm = document.querySelector('.popup__form-profile');
const editButton = document.querySelector('.user__edit-button');
const addCardButton = document.querySelector('.user__add-button');
const inputName = document.querySelector('.popup__input_value_name');
const inputInfo = document.querySelector('.popup__input_value_about');
const addCardForm = document.querySelector('.popup__form-addCard');
const userAvatar = document.querySelector('.user__avatar-wrapper');
const avatarForm = document.querySelector('.popup__form-avatar');
let currentUserInfo = {};

//class instances
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "302ca387-b31a-4cb2-8cb9-197e187dc382",
        "Content-Type": "application/json"
    }
});

const popupEditProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupEditProfile.setEventListeners();

const popupAddCardForm = new PopupWithForm('.popup_type_addCard', handleAddCardFormSubmit);
popupAddCardForm.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const deletePopup = new PopupWithForm('.popup_type_delete', handleDeleteCardFormSubmit);
deletePopup.setEventListeners();

const popupForAvatar = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
popupForAvatar.setEventListeners();

const pageGallery = new Section({
    items: [],
    renderer: (item) => {
        return createCard({ item });
    }
}, '.gallery');

const userInfoInstance = new UserInfo({ userName: '.user__name', userInfo: '.user__info' }, '.user__avatar');

//initialPage

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardData]) => {
        userInfoInstance.setUserInfo(userData);
        userInfoInstance.setUserAvatar(userData.avatar);
        currentUserInfo = userData;
        pageGallery.renderItems(cardData);
    })
    .catch(err => {
        console.log(err);
    });


//validators

const popupAddCard = new FormValidator(pageSettings, addCardForm);
popupAddCard.enableValidation();

const popupProfile = new FormValidator(pageSettings, editForm);
popupProfile.enableValidation();

const avatarPopup = new FormValidator(pageSettings, avatarForm);
avatarPopup.enableValidation();

//functions

function createCard({ item }) {
    const card = new Card({
            item,
            handleCardClick: ({ name, link }) => {
                popupImage.open({ name, link });
            }
        },
        cardTemplate,
        handleDeleteClick, handleLikeClick);
    const cardElement = card.generateCard(currentUserInfo);
    return cardElement;
}

function handleAvatarFormSubmit() {
    const data = popupForAvatar.getInputValues();
    api.editProfilePhoto(data.avatar).then((res) => {
            userInfoInstance.setUserAvatar(data.avatar);
            popupForAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
}

function handleLikeClick(data, isLiked) {
    if (isLiked) {
        api.likeDelete(data)
            .then((res) => {
                data.updateLike(res);
            }).catch(err => {
                console.log(err);
            })
    } else {
        api.likeAdd(data)
            .then((res) => {
                data.updateLike(res);
            }).catch(err => {
                console.log(err);
            })
    }
}

function handleDeleteClick(data) {
    deletePopup.openWithData(data);
}

function handleDeleteCardFormSubmit(data) {
    api.deleteCard(data).then((res) => {
            data.removeCard();
            deletePopup.close('Yes');
        })
        .catch((err) => {
            console.log(err);
        })
}

function handleProfileFormSubmit() {
    api.setUserInfo(popupEditProfile.getInputValues())
        .then((res) => {
            userInfoInstance.setUserInfo(res);
            popupEditProfile.close();
        })
        .catch((err) => {
            console.log(err);
        })
}

function handleAddCardFormSubmit() {
    const getValues = popupAddCardForm.getInputValues();
    const data = { name: getValues.title, link: getValues.url };
    api.sendCardData(data).then((item) => {
        pageGallery.addItem(item);
        popupAddCardForm.close();
    });
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
userAvatar.addEventListener('click', () => {
    avatarPopup.resetValidation();
    popupForAvatar.open();
});