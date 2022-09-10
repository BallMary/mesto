import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitForm} ) {
      super(popupSelector);
      this._submitForm = submitForm;
      this._popupContainer = this._popup.querySelector(".popup__container");
      this._inputList = this._popupContainer.querySelectorAll('.popup__input');
      this._button = this._popupContainer.querySelector('.popup__button_save');
    }

    _getInputValues () {
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popupContainer.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        this._button.textContent = 'Сохранение...'
        await this._submitForm(this._getInputValues());
        this._button.textContent = 'Сохранить'
        this.close();
      });
    }

    close() {
      super.close();
      this._popupContainer.reset();
      }
}