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
const popupWindow = document.querySelector('.popup');
const popupEditContainer = document.querySelector('.popup__edit-container');
const popupAddContainer = document.querySelector('.popup__add-container');
const popupImageContainer = document.querySelector('.popup__image-container');
const editButton = document.querySelector('.user__edit-button');
const addPlaceButton = document.querySelector('.user__add-button');
const closeEditButton = document.querySelector('.popup__close-button_type_edit');
const closeAddButton = document.querySelector('.popup__close-button_type_add');
const closeImageButton = document.querySelector('.popup__close-button_type_image');
const inputName = document.querySelector('.popup__input_value_name');
const userName = document.querySelector('.user__name');
const inputTitle = document.querySelector('.popup__input_value_title');
const inputUrl = document.querySelector('.popup__input_value_url');
const inputInfo = document.querySelector('.popup__input_value_about');
const userInfo = document.querySelector('.user__info');

function editProfileWindow() {
    popupWindow.classList.add('popup_visible');
    popupEditContainer.classList.add('popup__container_display_flex');
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
}
editButton.addEventListener('click', editProfileWindow);

function addPlaceWindow() {
    popupWindow.classList.add('popup_visible');
    popupAddContainer.classList.add('popup__container_display_flex');
}
addPlaceButton.addEventListener('click', addPlaceWindow);

function closePopup() {
    popupWindow.classList.remove('popup_visible');
    popupEditContainer.classList.remove('popup__container_display_flex');
    popupAddContainer.classList.remove('popup__container_display_flex');
    popupImageContainer.style.visibility = "hidden";
    let elementPic = document.querySelector('.popup__image');
    elementPic.src = "";
    let elementText = document.querySelector('.popup__image-text');
    elementText.textContent = "";
}

closeEditButton.addEventListener('click', closePopup);
closeAddButton.addEventListener('click', closePopup);
closeImageButton.addEventListener('click', closePopup);


function editFormSubmit(event) {
    event.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    popupWindow.classList.remove('popup_visible');
    popupEditContainer.classList.remove('popup__container_display_flex');
}
popupEditContainer.addEventListener('submit', editFormSubmit);


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

    imageViewFunc();
    deleteButtonFunc();
    popupClose();
}
popupAddContainer.addEventListener('submit', placeFormSubmit);

function popupClose() {
    popupWindow.classList.remove('popup_visible');
    popupAddContainer.classList.remove('popup__container_display_flex');
}

const likeButton = document.querySelectorAll('.gallery__like-button');
likeButton.forEach(item => {
    item.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('gallery__like-button_active');
    });
});

function deleteButtonFunc() {
    const deleteButton = document.querySelectorAll('.gallery__delete-button');
    deleteButton.forEach(item => {
        item.addEventListener('click', function(evt) {
            const eventTarget = evt.target;
            const parent = eventTarget.parentNode;
            parent.remove();
        });
    });
}
deleteButtonFunc();

function imageViewFunc() {
    const imageView = document.querySelectorAll('.gallery__picture');
    imageView.forEach(item => {
        item.addEventListener('click', function(evt) {
            const eventTarget = evt.target;
            let elementPic = document.querySelector('.popup__image');
            elementPic.src = eventTarget.src;
            let elementText = document.querySelector('.popup__image-text');
            elementText.textContent = eventTarget.parentNode.textContent;
            popupWindow.classList.add('popup_visible');
            popupImageContainer.style.visibility = "visible";
        });
    });
}
imageViewFunc();