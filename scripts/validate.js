const pageSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_active"
};

const showInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(pageSettings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(pageSettings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
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

const checkInputValidity = (formElement, inputElement, settings) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, settings);
    } else {
        showInputError(formElement, inputElement, settings);
    }
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        shutdownSubmitButton(buttonElement, settings);
    } else {
        buttonElement.classList.remove(pageSettings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

function shutdownSubmitButton(buttonElement, settings) {
    buttonElement.classList.add(pageSettings.inactiveButtonClass);
    buttonElement.disabled = true;
}
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(pageSettings.inputSelector));
    const buttonElement = formElement.querySelector(pageSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function() {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(pageSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
}
enableValidation(pageSettings);