export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
          this.close();
        }
      }
      
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
      }
      
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
      }

    setEventListeners() {
          this._popupSelector
          .querySelector(".popup__close-button")
          .addEventListener("click", () => {
            this.close();
          });

          this._popupSelector
      .querySelector(".popup__overlay")
      .addEventListener("click", () => {
        this.close();
      });
}
}