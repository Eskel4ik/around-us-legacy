export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _showInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._settings.errorClass);
    }
    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        this._errorElement.classList.remove(this._settings.errorClass);
        this._errorElement.textContent = "";
    }

    _hasInvalidInput(inputList) {
        const inputs = Array.from(inputList);
        return inputs.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._submitButton.classList.add(this._settings.inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._settings.inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }
    _handleInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }
    _setEventListeners() {
        this._inputList = this._formElement.querySelectorAll(this._settings.inputSelector);
        this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._handleInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}