let editButton = document.querySelector('.edit-button');
let closeButton = document.querySelector('.popup__close-button');

function popupShow() {
    let popupWindow = document.querySelector('.popup');
    popupWindow.classList.toggle('visible');
}
editButton.addEventListener('click', popupShow);
closeButton.addEventListener('click', popupShow);

let inputName = document.querySelector('.popup__input_value_name');
let userName = document.querySelector('.user__name').textContent;
let inputInfo = document.querySelector('.popup__input_value_about');
let userInfo = document.querySelector('.user__info').textContent;

inputName.setAttribute('value', userName);
inputInfo.setAttribute('value', userInfo);

function updateUser() {
    userName = inputName.value;
    userInfo = inputInfo.value;
    console.log(inputName.value);
    console.log(inputInfo.value);
    console.log(inputInfo.value);
}
let saveButton = document.querySelector('.popup__button');
saveButton.addEventListener('click', updateUser);