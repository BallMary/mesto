import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitForm} ) {
      super(popupSelector);
      this._submitForm = submitForm;
      this._popupContainer = this._popup.querySelector(".popup__container");
    }

    _getInputValues () {
      this._inputList = this._popupContainer.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popupContainer.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitForm(this._getInputValues());
        this.close();
      });
    }

    close() {
      super.close();
      this._popupContainer.reset();
      }
}