const popupEdit = document.querySelector('.popup_edit');
const popupEditAvatar = document.querySelector('.popup_edit-avatar');
const formElementEdit = popupEdit.querySelector('.popup__container_edit');
const formElementEditAvatar = popupEditAvatar.querySelector('.popup__container_edit-avatar');
const inputEditAvatar = popupEditAvatar.querySelector('.popup__input_type_link');
const nameInputEdit = popupEdit.querySelector('.popup__input_type_name');
const jobInputEdit = popupEdit.querySelector('.popup__input_type_about');
const linkAvatar = popupEditAvatar.querySelector('.popup__input_type_link');
const popupCard = document.querySelector('.popup_card');
const buttonPlus = document.querySelector('.profile__button');
const infoButton = document.querySelector('.profile__info-button');
const deleteButton = document.querySelector('.element__delete');
const elementHeart = document.querySelectorAll('.element__heart');
const avatarUser = document.querySelector('.profile__user')

const nameProfile = document.querySelector('.profile__title');
const aboutProfile = document.querySelector('.profile__subtitle');
const avatarProfile = document.querySelector('.profile__avatar');
const elementImage = document.querySelector('.element__image');
const elementTitle = document.querySelector('.element__title');
const buttonSave = popupEdit.querySelector('.popup__button_save');

export { popupEdit, elementHeart, buttonSave, linkAvatar, avatarUser, popupEditAvatar, formElementEditAvatar, inputEditAvatar, formElementEdit, nameInputEdit, jobInputEdit, popupCard, buttonPlus, infoButton, deleteButton, nameProfile, aboutProfile, avatarProfile, elementImage, elementTitle }