import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleDelete) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container_delete');
        this._handleDelete = handleDelete; 
        this._deleteHandler = this._deleteHandler.bind(this);
    }

    _deleteHandler(evt) {
        evt.preventDefault();
        this._handleDelete(this._cardId, this._cardElement);
    }

    open(cardId, cardElement) {
        super.open();
        this._cardId = cardId;
        this._cardElement = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._deleteHandler);
        }
}
