let popupWindow = document.querySelector('.popup');
let popupProfile = document.querySelector('.popup__form-profile');
let popupPlace = document.querySelector('.popup__form-place');
let editButton = document.querySelector('.user__edit-button');
let addPlaceButton = document.querySelector('.user__add-button');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input_value_name');
let userName = document.querySelector('.user__name');
let inputTitle = document.querySelector('.popup__input_value_title');
let inputUrl = document.querySelector('.popup__input_value_url');
let inputInfo = document.querySelector('.popup__input_value_about');
let userInfo = document.querySelector('.user__info');

function editProfileWindow() {
    popupWindow.classList.add('popup_visible');
    popupProfile.classList.add('popup__form_display_flex');
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
}
editButton.addEventListener('click', editProfileWindow);

function addPlaceWindow() {
    popupWindow.classList.add('popup_visible');
    popupPlace.classList.add('popup__form_display_flex');
}
addPlaceButton.addEventListener('click', addPlaceWindow);

function closePopup() {
    popupWindow.classList.remove('popup_visible');
    popupProfile.classList.remove('popup__form_display_flex');
    popupPlace.classList.remove('popup__form_display_flex');
}

closeButton.addEventListener('click', closePopup);

function editFormSubmit(event) {
    event.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    popupWindow.classList.remove('popup_visible');
    popupProfile.classList.remove('popup__form_display_flex');
}
popupProfile.addEventListener('submit', editFormSubmit);

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
const galleryWindow = document.querySelector('.gallery');

initialCards.forEach(card => {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);

    const cardImage = cardElement.querySelector('.gallery__picture');
    const cardText = cardElement.querySelector('.gallery__text');

    cardImage.src = card.link;
    cardText.textContent = card.name;
    galleryWindow.append(cardElement);
});

function placeFormSubmit(event) {
    event.preventDefault();
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);

    const cardImage = cardElement.querySelector('.gallery__picture');
    const cardText = cardElement.querySelector('.gallery__text');

    cardImage.src = inputUrl.value;
    cardText.textContent = inputTitle.value;

    galleryWindow.prepend(cardElement);
    let likeButton = cardElement.querySelector('.gallery__like-button');
    likeButton.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('gallery__like-button_active');
    });
    let deleteButton = cardElement.querySelector('.gallery__delete-button');
    deleteButton.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        const parent = eventTarget.parentNode;
        parent.remove();
    });
    popupWindow.classList.remove('popup_visible');
    popupPlace.classList.remove('popup__form_display_flex');
}
popupPlace.addEventListener('submit', placeFormSubmit);

const likeButton = document.querySelectorAll('.gallery__like-button');
likeButton.forEach(item => {
    item.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('gallery__like-button_active');
    });
});

const deleteButton = document.querySelectorAll('.gallery__delete-button');
deleteButton.forEach(item => {
    item.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        const parent = eventTarget.parentNode;
        parent.remove();
    });
});