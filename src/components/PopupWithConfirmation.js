import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleDelete) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container_delete');
        this._handleDelete = handleDelete; 
    }

    submitCard(cardId, cardElement) {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleDelete(cardId, cardElement);
            this.close();
            },
        this._form.removeEventListener('submit', () => {
            this._handleDelete(cardId, cardElement);
        })
    )}
        }

    // setEventListeners() {
    //     super.setEventListeners()
    //     this._form.addEventListener("submit", (evt) => {
    //     evt.preventDefault();
    //     this.close();
    //     this._handleDelete(this._cardId);
    //     }
    // )}
