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
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
        if (this._hasInvalidInput(this._inputList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.disabled = false;
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
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._handleInputValidity(inputElement);
                this._toggleButtonState(this._inputList);
            });
        });
    };
    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}