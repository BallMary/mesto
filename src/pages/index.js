import '../pages/index.css';
import FormValidator  from '../components/FormValidator.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

import { initialCards } from "../utils/initialCards.js";
import { enableValidation } from "../utils/enableValidation.js";
import { formElementEdit, nameInputEdit, jobInputEdit, popupCard, buttonPlus, infoButton } from '../utils/constants.js';

// Для каждой проверяемой формы создали экземпляр класса FormValidator
const formValidatorEdit = new FormValidator(enableValidation, formElementEdit);
const formValidatorAdd = new FormValidator(enableValidation, popupCard);
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

// работа попапов(открытие)

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');


infoButton.addEventListener('click', () => {
  const infoAboutUser = userInfo.getUserInfo();
  nameInputEdit.value = infoAboutUser.userName;
  jobInputEdit.value = infoAboutUser.personalInformation;
  formValidatorEdit.resetValidator();
  popupEditProfile.open();
});

buttonPlus.addEventListener('click', ()  => {
  formValidatorAdd.resetValidator();
  popupAddCard.open();
});

const popupImage = new PopupWithImage('.popup_open-photo');
popupImage.setEventListeners();

const openImage = (name, link) => {
  popupImage.open(name, link);
};

// Функция создание карточки
const createCard = (title, link) => {
  const card = new Card(title, link, '#template', openImage);
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item.name, item.link);
      cardsList.addItem(card);
    },
  },
  ".elements"
);

cardsList.renderItems(initialCards);

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit',
  submitForm: (data) => {
    userInfo.setUserInfo(data.name, data.about);
  },
});

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_card',
  submitForm: (data) => {
    cardsList.addItem(createCard(data.title, data.link));
  },
});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

