const popupElement = document.querySelector('.popup');
const infoButton = document.querySelector('.profile__info-button');
const closeButton = popupElement.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = popupElement.querySelector('.popup__name');
let jobInput = popupElement.querySelector('.popup__job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

infoButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault(); 
   profileTitle.textContent = nameInput.value;
   profileSubtitle.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);