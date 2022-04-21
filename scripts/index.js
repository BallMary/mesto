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
const createCard = (photoName, photoLink) => {
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

const renderCard = (photoName, photoLink) => {
  elementsContainer.prepend(createCard(photoName, photoLink));
}

const addCard = (evt) => {
  
  evt.preventDefault();
  const photoName =  titleInputCard.value;
  const photoLink = linkInputCard.value;
  renderCard(photoName, photoLink);

  closePopup(popupCard);
  formElementCard.reset();
}

const elements = initialCards.map((item) => renderCard(item.name, item.link));

formElementCard.addEventListener('submit', addCard);


closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));
  // formElementCard.reset();

  
closeButtonPhoto.addEventListener('click', () => closePopup(popupOpenPhoto));
// работа попапов

// функция открытия попапа редактирования профиля
function openPopupProfileEdit() {
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  popupButtonEdit.disabled = false;
  popupButtonEdit.classList.remove('popup__button_disabled');
  openPopup(popupEdit);
}

infoButton.addEventListener('click', () => {
  openPopupProfileEdit();
  isValid(formElementEdit, nameInputEdit, 'popup__input-error', 'popup__error-visible');
  isValid(formElementEdit, jobInputEdit, 'popup__input-error', 'popup__error-visible');
});

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInputEdit.value;
  profileSubtitle.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// создания нового места
function addCardPlace() {
  openPopup(popupCard);
  popupButtonCard.disabled = true;
}
buttonPlus.addEventListener('click', addCardPlace);

const escKey = 'Escape';
const closeByEscape = (event) => {
  if (event.key === escKey) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popupButtonCard.classList.add('popup__button_disabled');
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEscape);
}

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach (popup => {
  popup.addEventListener('mousedown', (evt) => {
     if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
});
