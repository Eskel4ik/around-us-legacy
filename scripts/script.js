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
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeAddCard = document.querySelector('.popup_type_addCard');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupForm = document.querySelector('.popup__form-place');
const editButton = document.querySelector('.user__edit-button');
const addCardButton = document.querySelector('.user__add-button');
const closeEditButton = document.querySelector('.popup__close-button_type_edit');
const closeAddButton = document.querySelector('.popup__close-button_type_addCard');
const closeImageButton = document.querySelector('.popup__close-button_type_image');
const inputName = document.querySelector('.popup__input_value_name');
const userName = document.querySelector('.user__name');
const inputTitle = document.querySelector('.popup__input_value_title');
const inputUrl = document.querySelector('.popup__input_value_url');
const inputInfo = document.querySelector('.popup__input_value_about');
const userInfo = document.querySelector('.user__info');
const imageView = document.querySelectorAll('.gallery__picture');
const cardTemplate = document.querySelector("#card-template").content;

function openPopup(popup) {
    popup.classList.add('popup_visible');
}

function closePopup(popup) {
    popup.classList.remove('popup_visible');
}

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
    cardElement.querySelector('.gallery__picture').src = card.link;
    cardElement.querySelector('.gallery__text').textContent = card.name;
    cardElement.querySelector('.gallery__like-button').addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('gallery__like-button_active');
    });
    cardElement.querySelector('.gallery__delete-button').addEventListener('click', function(evt) {
        cardElement.remove();
    });
    cardElement.querySelector('.gallery__picture').addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        let elementPic = document.querySelector('.popup__image');
        elementPic.src = eventTarget.src;
        let elementText = document.querySelector('.popup__image-text');
        elementText.textContent = eventTarget.parentNode.textContent;
        popupTypeImage.classList.add('popup_visible');
    });
    popupTypeAddCard.addEventListener('submit', placeFormSubmit);
    return cardElement;
}

editButton.addEventListener('click', () => {
    openPopup(popupTypeProfile);
});
closeEditButton.addEventListener('click', () => {
    closePopup(popupTypeProfile)
});
addCardButton.addEventListener('click', () => {
    openPopup(popupTypeAddCard);
    popupForm.reset();
});
closeAddButton.addEventListener('click', () => {
    closePopup(popupTypeAddCard);
});
closeImageButton.addEventListener('click', () => {
    closePopup(popupTypeImage);
    const elementPic = document.querySelector('.popup__image');
    elementPic.src = "";
    const elementText = document.querySelector('.popup__image-text');
    elementText.textContent = "";
});

function hanldeProfileFormSubmit(event) {
    event.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    popupTypeProfile.classList.remove('popup_visible');
}
popupTypeProfile.addEventListener('submit', hanldeProfileFormSubmit);

function placeFormSubmit(event) {
    event.preventDefault();
    const cardElement = createCard({ name: inputTitle.value, link: inputUrl.value });
    galleryWindow.prepend(cardElement);
    closePopup(popupTypeAddCard);
}
initialCards.forEach(card => {
    let cardAdd = createCard(card);
    galleryWindow.prepend(cardAdd);
});