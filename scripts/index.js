const popupElement = document.querySelector('.popup');
const infoButton = document.querySelector('.profile__info-button');
const closeButton = popupElement.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = popupElement.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = popupElement.querySelector('.popup__job');// Воспользуйтесь инструментом .querySelector()
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
    console.log(event.key);
    if(event.key === ESC_KEY) {
        closePopup();
    }
}

infoButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

const ESC_KEY = 'Escape';


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
   profileTitle.textContent = nameInput.value;
   profileSubtitle.textContent = jobInput.value;
    closePopup();
    
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);