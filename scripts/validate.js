const pageSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_active"
};

const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(pageSettings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(pageSettings.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(pageSettings.inputErrorClass);
    errorElement.classList.remove(pageSettings.errorClass);
    errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
    }
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        shutdownSubmitButton(buttonElement);
    } else {
        buttonElement.classList.remove(pageSettings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

function shutdownSubmitButton(buttonElement) {
    buttonElement.classList.add(pageSettings.inactiveButtonClass);
    buttonElement.disabled = true;
}
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(pageSettings.inputSelector));
    const buttonElement = formElement.querySelector(pageSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(pageSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
}
enableValidation();