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
const elementTitle = document.querySelector('.element__title');
const popupPhotoContainer = document.querySelector('.popup__photo-container');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoName = document.querySelector('.popup__photo-name');
const popupOpenPhoto = document.querySelector('.popup_open-photo');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonCard = popupCard.querySelector('.popup__close-button');
const closeButtonPhoto = popupOpenPhoto.querySelector('.popup__close-button');

const createCards = (photoName, photoLink) => {
  const template = document.querySelector('#template');
  const place = template.content.querySelector('.element').cloneNode(true);
  const elementImage = place.querySelector('.element__image');
  elementImage.src = photoLink;
  elementImage.alt = photoName;
  place.querySelector('.element__title').textContent = photoName;
  place.querySelector('.element__delete').addEventListener('click', () => {
  place.remove();
  });
  place.querySelector('.element__heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__heart_active');
  });

  elementImage.addEventListener('click', () => {
    openPopup(popupOpenPhoto);
    popupPhotoName.textContent = photoName;
    popupPhoto.src = photoLink;
    popupPhoto.alt = photoName;
  });
  
  return place;
}

const renderCards = (photoName, photoLink) => {
  elementsContainer.prepend(createCards(photoName, photoLink));
}

const addCards = (evt) => {
  evt.preventDefault();
  const photoName =  titleInputCard.value;
  const photoLink = linkInputCard.value;
  renderCards(photoName, photoLink);
  closePopup(popupCard);
  formElementCard.reset();
}

const elements = initialCards.map(function(item) {
  return createCards(item.name, item.link);
 
});

elementsContainer.append(...elements);
formElementCard.addEventListener('submit', addCards);

closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));
closeButtonPhoto.addEventListener('click', () => closePopup(popupOpenPhoto));
// работа попапов

function editPopup() {
  openPopup(popupEdit);
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
}

infoButton.addEventListener('click', editPopup);

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInputEdit.value;
  profileSubtitle.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// создания нового места
function addCard() {
  openPopup(popupCard);
}
buttonPlus.addEventListener('click', addCard);

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}