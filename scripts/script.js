let popupWindow = document.querySelector('.popup');
let editButton = document.querySelector('.user__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input_value_name');
let userName = document.querySelector('.user__name');
let inputInfo = document.querySelector('.popup__input_value_about');
let userInfo = document.querySelector('.user__info');
let saveButton = document.querySelector('.popup__button');

editButton.addEventListener('click', () => {
    popupWindow.classList.toggle('visible');
    inputName.setAttribute('value', userName.textContent);
    inputInfo.setAttribute('value', userInfo.textContent);
});

closeButton.addEventListener('click', () => {
    popupWindow.classList.toggle('visible');
});

popupWindow.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
});
saveButton.addEventListener('click', () => {
    popupWindow.classList.toggle('visible');
});