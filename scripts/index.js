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
const popupButtonCard = popupCard.querySelector('.popup__button_create');
const popupButtonEdit = popupEdit.querySelector('.popup__button_save');
const titleCardError = popupCard.querySelector('#title-card-error');
const linkError = popupCard.querySelector('#link-error');
const nameError = popupEdit.querySelector('#name-error');
const aboutError = popupEdit.querySelector('#about-error');


// функция создания карточки
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
  // formElementCard.reset();

  
closeButtonPhoto.addEventListener('click', () => closePopup(popupOpenPhoto));
// работа попапов

// функция открытия попапа редактирования профиля
function editPopup() {
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  popupButtonEdit.disabled = false;
  popupButtonEdit.classList.remove('popup__button_disabled');
  formElementEdit.classList.remove('popup__input_type_error');
  openPopup(popupEdit);
}

infoButton.addEventListener('click', () => {
  editPopup();
  isValid(formElementEdit, nameInputEdit);
  isValid(formElementEdit, jobInputEdit);
});

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

const escKey = 'Escape';
const onDocumentKeyUp = (event) => {
  if (event.key === escKey) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  if (titleInputCard.value.trim().length === 0 && linkInputCard.value.trim().length === 0) {
    popupButtonCard.classList.add('popup__button_disabled');
    popupButtonCard.disabled = true;
  } else {
    popupButtonCard.disabled = false;
  }
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

const findPopup = Array.from(document.querySelectorAll('.popup'));
findPopup.forEach (popup => {
  popup.addEventListener('mousedown', (evt) => {
     if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
});
