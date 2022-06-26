import { FormValidator } from '../components/FormValidator.js';
import {Popup} from '../components/Popup.js';
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";

import { initialCards } from "../utils/initialCards.js";
import { enableValidation } from "../utils/enableValidation.js";
import {popupEdit, formElementEdit, nameInputEdit, jobInputEdit, popupCard, 
        titleInputCard, linkInputCard, buttonPlus, infoButton,popupOpenPhoto, } from '../utils/constants.js';

// Для каждой проверяемой формы создали экземпляр класса FormValidator
const editFormValidator = new FormValidator(enableValidation, formElementEdit);
const addFormValidator = new FormValidator(enableValidation, popupCard);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// работа попапов(открытие)

infoButton.addEventListener('click', () => {
  const infoAboutUser = userInfo.getUserInfo();
  nameInputEdit.value = infoAboutUser.userName;
  jobInputEdit.value = infoAboutUser.personalInformation;

  openPopup(popupEdit);
  setEventListeners(popupEdit);
  editFormValidator.resetValidator();
});

buttonPlus.addEventListener('click', ()  => {
  addFormValidator.resetValidator();
  setEventListeners(popupCard);
  openPopup(popupCard);
});

const openPopup = (popup) => {
  const popupOpen = new Popup(popup);
  popupOpen.open();
}

const setEventListeners = (popup) => {
  const popupWithSetEventListeners = new Popup(popup);
  popupWithSetEventListeners.setEventListeners();
};

const userInfo = new UserInfo(title, subtitle);


const addCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item.inputTitle, item.inputField, "#template");
      addCard.addItem(createCard(item.inputTitle, item.inputField));
    },
  },
  ".elements"
);

addCard.rendererItems();

const popupEditProfile = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: () => {
    userInfo.setUserInfo(nameInput, jobInput);
  },
});

const popupAddCard = new PopupWithForm({
  popupSelector: popupCard,
  submitForm: () => {
    const inputField = linkInputCard.value;
    const inputTitle = titleInputCard.value;
    popupAddCard.addItem(createCard(inputTitle, inputField));
  },
});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();


const elementImage = (photoName, photoLink) => {
  const PopupImage = new PopupWithImage(popupOpenPhoto);
  PopupImage.open(photoName, photoLink);
  setEventListeners(popupOpenPhoto);
};

// Функция создание карточки
const createCard = (inputTitle, inputField) => {
  const card = new Card(inputTitle, inputField, '#template');
  const cardElement = card.generateCard();
  return cardElement;
};