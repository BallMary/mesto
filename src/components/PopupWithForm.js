import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitForm} ) {
      super(popupSelector);
      this._popupSelector = popupSelector;
      this._submitForm = submitForm;
      this._popupContainer = this._popupSelector.querySelector(".popup__container");
    }

    _getInputValues () {
        // достаём все элементы полей
      this._inputList = this._popupSelector.querySelectorAll('.popup__input');

      // создаём пустой объект
      this._formValues = {};

      // добавляем в этот объект значения всех полей
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });

      // возвращаем объект значений
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

// Для каждого попапа создавать свой экземпляр класса PopupWithForm