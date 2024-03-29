export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._popup
            .querySelector(".popup__close-button")
            .addEventListener("click", () => {
                this.close();
            });

        this._popup
            .querySelector(".popup__overlay")
            .addEventListener("mousedown", () => {
                this.close();
            });
    }
}