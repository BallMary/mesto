const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const formElementEdit = popupEdit.querySelector('.popup__container_edit');
const nameInputEdit = popupEdit.querySelector('.popup__input_type_name');
const jobInputEdit = popupEdit.querySelector('.popup__input_type_about');
const popupCard = document.querySelector('.popup_card');
const formElementCard = popupCard.querySelector('.popup__container_add');
const titleInputCard = popupCard.querySelector('.popup__input_type_title');
const linkInputCard = popupCard.querySelector('.popup__input_type_link');
const buttonPlus = document.querySelector('.profile__button');
const infoButton = document.querySelector('.profile__info-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoName = document.querySelector('.popup__photo-name');
const popupOpenPhoto = document.querySelector('.popup_open-photo');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonCard = popupCard.querySelector('.popup__close-button');
const closeButtonPhoto = popupOpenPhoto.querySelector('.popup__close-button');
const popupButtonCard = popupCard.querySelector('.popup__button_create');


const enableValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error-visible',
  popupCloseButton: '.popup__close-button'
  }; 

  import { FormValidator } from './FormValidator.js'

// Для каждой проверяемой формы создали экземпляр класса FormValidator
const editFormValidator = new FormValidator(enableValidation, formElementEdit);
const addFormValidator = new FormValidator(enableValidation, popupCard);
editFormValidator.enableValidation();
addFormValidator.enableValidation();


closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));

  
closeButtonPhoto.addEventListener('click', () => closePopup(popupOpenPhoto));
// работа попапов

// функция открытия попапа редактирования профиля
function openPopupProfileEdit() {
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  editFormValidator.resetValidator();
  openPopup(popupEdit);
}

infoButton.addEventListener('click', () => {
  openPopupProfileEdit();
});

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInputEdit.value;
  profileSubtitle.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}
formElementEdit.addEventListener('submit', handleProfileFormSubmit);


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      };
  });
});

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

import {Card} from './Card.js'

// Функция добавление карточки на страницу
const addCardPlace = (evt) => {
  evt.preventDefault();
  const inputTitle = titleInputCard.value;
  const inputField = linkInputCard.value;
  addCard(inputTitle, inputField);
  closePopup(popupCard);
  formElementCard.reset();
  addFormValidator.resetValidator();
}


buttonPlus.addEventListener('click', ()  => {
  openPopup(popupCard);
});

popupButtonCard.addEventListener('click', addCardPlace);


const addCard = (name, link) => {
  elementsContainer.prepend(createCard(name, link));
};


export const elementImage = (photoName, photoLink) => {
  popupPhotoName.textContent = photoName;
  popupPhoto.src = photoLink;
  popupPhoto.alt = photoName;
  openPopup(popupOpenPhoto);
};

// Функция создание карточки
const createCard = (inputTitle, inputField) => {
  const card = new Card(inputTitle, inputField, '#template');
  const cardElement = card.generateCard();
  return cardElement;
};

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  createCard(item);
  elementsContainer.prepend(createCard(item.name, item.link));
}); 
