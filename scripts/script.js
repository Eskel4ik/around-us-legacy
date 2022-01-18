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
const addCardForm = document.querySelector('.popup__form-addCard');
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
const cardTemplate = document.querySelector("#card-template").content;
const elementPic = document.querySelector('.popup__image');
const elementText = document.querySelector('.popup__image-text');
const popupElements = document.querySelectorAll('.popup');

function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', escapeButtonHandler);
    const popupSubmitButton = popup.querySelector('.popup__button');
    if (popup.contains(popupSubmitButton)) {
        popupSubmitButton.disabled = true;
        popupSubmitButton.classList.add('popup__button_disabled');
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', escapeButtonHandler);
}

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
    const cardPicture = cardElement.querySelector('.gallery__picture');
    cardPicture.src = card.link;
    cardPicture.alt = `${card.name} photo`;
    cardElement.querySelector('.gallery__text').textContent = card.name;
    cardElement.querySelector('.gallery__like-button').addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('gallery__like-button_active');
    });
    cardElement.querySelector('.gallery__delete-button').addEventListener('click', function(evt) {
        cardElement.remove();
    });
    cardPicture.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        elementPic.src = eventTarget.src;
        elementPic.alt = `${card.name} photo`;
        elementText.textContent = card.name;
        openPopup(popupTypeImage);
    });
    return cardElement;
}

editButton.addEventListener('click', () => {
    openPopup(popupTypeProfile);
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
});
closeEditButton.addEventListener('click', () => {
    closePopup(popupTypeProfile)
});
addCardButton.addEventListener('click', () => {
    openPopup(popupTypeAddCard);
});
closeAddButton.addEventListener('click', () => {
    closePopup(popupTypeAddCard);
});
closeImageButton.addEventListener('click', () => {
    closePopup(popupTypeImage);
    elementPic.src = "";
    elementText.textContent = "";
});

function handleProfileFormSubmit(event) {
    event.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    closePopup(popupTypeProfile);
}

function handleAddCardFormSubmit(event) {
    event.preventDefault();
    const cardElement = createCard({ name: inputTitle.value, link: inputUrl.value });
    galleryWindow.prepend(cardElement);
    addCardForm.reset();
    closePopup(popupTypeAddCard);
}
popupTypeProfile.addEventListener('submit', handleProfileFormSubmit);
popupTypeAddCard.addEventListener('submit', handleAddCardFormSubmit);
initialCards.forEach(card => {
    const cardAdd = createCard(card);
    galleryWindow.prepend(cardAdd);
});

popupElements.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains('popup_visible')) {
            closePopup(popup);
        } else if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

function escapeButtonHandler(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector(".popup_visible");
        closePopup(openedPopup);
    }
}