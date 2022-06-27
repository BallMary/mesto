import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popupSelector.querySelector('.popup__photo');
    this._popupPhotoName = this._popupSelector.querySelector('.popup__photo-name');
  }
    open(name, link) {
      super.open();
      this._popupPhoto.src = link;
      this._popupPhotoName.alt = name;
      this._popupPhotoName.textContent = name;
      }
}