let popupWindow = document.querySelector('.popup');
let editButton = document.querySelector('.user__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input_value_name');
let userName = document.querySelector('.user__name');
let inputInfo = document.querySelector('.popup__input_value_about');
let userInfo = document.querySelector('.user__info');

function editProfileWindow() {
    popupWindow.classList.toggle('popup_visibility_visible');
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
}
editButton.addEventListener('click', editProfileWindow);

function closePopup() {
    popupWindow.classList.toggle('popup_visibility_visible');
}

closeButton.addEventListener('click', closePopup);

function formSubmit(event) {
    event.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    popupWindow.classList.toggle('popup_visibility_visible');
}
popupWindow.addEventListener('submit', formSubmit);