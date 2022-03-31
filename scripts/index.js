// отображение карточек на странице
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

const popupEdit = document.querySelector('.popup_edit');
const popupPlus = document.querySelector('.popup_plus');
const closeButtonPlus = popupPlus.querySelector('.popup__close-button');
let formElementPlus = popupPlus.querySelector('.popup__container_add');
let titleInputPlus = formElementPlus.querySelector('.popup__input_type_title');
let linkInputPlus = formElementPlus.querySelector('.popup__input_type_link');
const buttonPlus = document.querySelector('.profile__button');
const infoButton = document.querySelector('.profile__info-button');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
let formElementEdit = popupEdit.querySelector('.popup__container_edit');
let nameInputEdit = popupEdit.querySelector('.popup__input_type_name');
let jobInputEdit = popupEdit.querySelector('.popup__input_type_about');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements');
const elementTitle = document.querySelector('.element__title');
const elementImage = document.querySelector('.element__image');
const popupPhotoContainer = document.querySelector('.popup__photo-container');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoName = document.querySelector('.popup__photo-name');
const popupOpenPhoto = document.querySelector('.popup_open-photo');
const closeButtonPhoto = popupOpenPhoto.querySelector('.popup__close-button');

const createCards = (photoName, photoLink) => {
  const template = document.querySelector('#template');
  const place = template.content.querySelector('.element').cloneNode(true);
  place.querySelector('.element__image').src = photoLink;
  place.querySelector('.element__title').textContent = photoName;
  place.querySelector('.element__delete').addEventListener('click', () => {
  place.remove();
  });
  place.querySelector('.element__heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__heart_active');
  });

  place.querySelector('.element__image').addEventListener('click', () => {
    popupPhotoContainer.parentElement.classList.add('popup_opened');
    popupPhotoName.textContent = photoName;
    popupPhoto.src = photoLink;
  });
  
  closeButtonPhoto.addEventListener('click', () => {
    popupPhotoContainer.parentElement.classList.remove('popup_opened');
  });
  
  return place;
}

const renderCards = (photoName, photoLink) => {
  elementsContainer.prepend(createCards(photoName, photoLink));
}

const addCards = (evt) => {
  evt.preventDefault();
  const photoName =  titleInputPlus.value;
  const photoLink = linkInputPlus.value;
  renderCards(photoName, photoLink);
  titleInputPlus.value = '';
  linkInputPlus.value = '';
}

const elements = initialCards.map(function(item) {
  return createCards(item.name, item.link);
 
});
elementsContainer.append(...elements);
formElementPlus.addEventListener('submit', addCards);

// работа попапов


function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
}

function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

infoButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', closePopupEdit);

function formSubmitHandlerEdit (evt) {
evt.preventDefault(); 
profileTitle.textContent = nameInputEdit.value;
profileSubtitle.textContent = jobInputEdit.value;
closePopupEdit();
}
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

// открытие попапа создания нового места

function openPopupPlus() {
  popupPlus.classList.add('popup_opened');
}

function closePopupPlus() {
  popupPlus.classList.remove('popup_opened');
}
buttonPlus.addEventListener('click', openPopupPlus);
closeButtonPlus.addEventListener('click', closePopupPlus);

function formSubmitHandlerPlus (evt) {
    evt.preventDefault(); 
    closePopupPlus();
}

formElementPlus.addEventListener('submit', formSubmitHandlerPlus);