//imports
import "./pages/index.css";

import Card from "./components/Card.js";
import FormValidator from "./components/formValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import {
    pageSettings,
} from "./components/utils/constants.js";

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
        pageGallery.addItem(createCard({ item }));
    }
}, '.gallery');

api.getInitialCards()
    .then((cardData) => {
        const cards = Array.from(cardData);
        cards.forEach(item => {
            pageGallery.addItem(createCard({ item }));
        });
    })
    .catch((err) => {
        console.log(err);
    })

const userInfoInstance = new UserInfo({ userName: '.user__name', userInfo: '.user__info' }, '.user__avatar');

api.getUserInfo()
    .then((info) => {
        userInfoInstance.setUserInfo(info);
        userInfoInstance.setUserAvatar(info.avatar);
        currentUserInfo = info;
        return currentUserInfo;
    }).catch((err) => {
        console.log(err);
    })

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
    const data = popupForAvatar._getInputValues();
    api.editProfilePhoto(data.url)
        .catch((err) => {
            console.log(err);
        })
    userInfoInstance.setUserAvatar(data.url);
}

function handleLikeClick(data) {
    api.likeDelete(data._id)
        .then((res) => {
            data._likeCounter.textContent = res.likes.length;
        })
        .catch((api.likeAdd(data)
            .then((res) => {
                data._likeCounter.textContent = res.likes.length;
            })))
}

function handleDeleteClick(data) {
    deletePopup.openWithData(data);
}

function handleDeleteCardFormSubmit(data) {
    api.deleteCard(data).then((res) => {
            data._element.remove();
            deletePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
}

function handleProfileFormSubmit() {
    api.setUserInfo(popupEditProfile._getInputValues())
        .catch((err) => {
            console.log(err);
        })
    userInfoInstance.setUserInfo(popupEditProfile._getInputValues());
}

function handleAddCardFormSubmit() {
    const getValues = popupAddCardForm._getInputValues();
    const data = { name: getValues.title, link: getValues.url };
    api.sendCardData(data).then((item) => {
        pageGallery.addItem(createCard({ item }));
    });
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
userAvatar.addEventListener('click', () => {
    avatarPopup.resetValidation();
    popupForAvatar.open();
});