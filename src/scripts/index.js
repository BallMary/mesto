import '../pages/index.css';
import FormValidator  from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

import { initialCards } from "../utils/initialCards.js";
import { enableValidation } from "../utils/enableValidation.js";
import {popupEdit, formElementEdit, nameInputEdit, jobInputEdit, popupCard, 
        titleInputCard, linkInputCard, buttonPlus, infoButton,popupOpenPhoto, profileSubtitle, profileTitle} from '../utils/constants.js';

// Для каждой проверяемой формы создали экземпляр класса FormValidator
const editFormValidator = new FormValidator(enableValidation, formElementEdit);
const addFormValidator = new FormValidator(enableValidation, popupCard);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// работа попапов(открытие)

const userInfo = new UserInfo(profileTitle, profileSubtitle);

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

const elementImage = (name, link) => {
  const PopupImage = new PopupWithImage(popupOpenPhoto);
  PopupImage.open(name, link);
  setEventListeners(popupOpenPhoto);
};

// Функция создание карточки
const createCard = (name, link) => {
  const card = new Card(name, link, '#template', elementImage);
  const cardElement = card.generateCard();
  return cardElement;
};

const addCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item.name, item.link, "#template", elementImage);
      addCard.addItem(createCard(item.name, item.link));
    },
  },
  ".elements"
);

addCard.renderItems();

const popupEditProfile = new PopupWithForm({
  popupSelector: popupEdit,
  submitForm: () => {
    userInfo.setUserInfo(nameInputEdit, jobInputEdit);
  },
});

const popupAddCard = new PopupWithForm({
  popupSelector: popupCard,
  submitForm: () => {
    const inputField = linkInputCard.value;
    const inputTitle = titleInputCard.value;
    addCard.addItem(createCard(inputTitle, inputField));
  },
});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

