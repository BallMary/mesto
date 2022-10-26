import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { enableValidation } from "../utils/enableValidation.js";
import { formElementEdit, avatarUser, elementHeart, formElementEditAvatar, nameInputEdit, jobInputEdit, popupCard, buttonPlus, infoButton, nameProfile,
         aboutProfile, avatarProfile, popupEdit } from '../utils/constants.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

const api = new Api({
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
        authorization: '0052e1a2-cce0-4efd-a4a0-a96b7082b662',
        'Content-Type': 'application/json'
    }
});
const userInfo = new UserInfo(nameProfile, aboutProfile, avatarProfile);
let userId = null;
// Для каждой проверяемой формы создали экземпляр класса FormValidator
const formValidatorEdit = new FormValidator(enableValidation, formElementEdit);
const formValidatorAdd = new FormValidator(enableValidation, popupCard);
const formValidatorEditAvatar = new FormValidator(enableValidation, formElementEditAvatar);
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorEditAvatar.enableValidation();
const popupImage = new PopupWithImage('.popup_open-photo');


const cardsList = new Section({
    renderer: (item) => {
        const card = createCard(item);
        cardsList.addInitialCards(card);
    }
},
".elements"
);

Promise.all([
    api.getUserInfo(),
    api.getCards(),
])

.then(([userData, cardData])=>{ 
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    userId = userData._id;
    cardsList.renderItems(cardData);
})

.catch((err)=>{ 
    console.log(err);
})

const openImage = (name, link) => {
    popupImage.open(name, link);
};

async function handleLike(data) {
    try {
         const like = await api.likeCard(data._cardId);
         data.clickOnHeart(like.likes);
    }
    catch(err) {
        console.log(err);
    }
    }

async function handleRemoveCardLike(data) {
    try {
        const like = await api.removeLikeCard(data._cardId);
        data.clickOnHeart(like.likes);
    }
    catch(err) {
        console.log(err);
    }
}

async function handleDelete (cardId, cardElement) {
    try {
       await api.deleteCard(cardId); 
        this.close(); 
        cardElement.remove();
    }
    catch(err) {
        console.log(`При удалении карточки:${err}`)
    } 
}

const popupDeleteCard = new PopupWithConfirmation('.popup_confirm', handleDelete);
const handleCardDelete = (cardId, cardElement) => {
    popupDeleteCard.open(cardId, cardElement);
}

// Функция создание карточки
const createCard = (item) => {
    const card = new Card(item, '.template', openImage, handleCardDelete, handleLike, handleRemoveCardLike, userId);
    const cardElement = card.generateCard();
    return cardElement;
};

const renderTextButton = (isLoading, buttonSelector) => {
    const button = document.querySelector(buttonSelector);
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}

const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_edit',
    submitForm: (data) => {
            renderTextButton(true, '.popup__button_edit');
            api.editUserInfo(data)
            .then((data) => {
                userInfo.setUserInfo(data.name, data.about);
                popupEditProfile.close();
            })
            .catch ((err) => {
            console.log(err);
        })
            .finally(() => {
                renderTextButton(false, '.popup__button_edit');
            })
        },
});

const popupEditAvatar = new PopupWithForm({
    popupSelector: '.popup_edit-avatar',
    submitForm: (data) => {
        renderTextButton(true, '.popup__button_avatar');
        api.editAvatar(data.avatar).then((data) => {
                userInfo.setAvatar(data.avatar);
                popupEditAvatar.close();
           })
        .catch ((err) => {
            console.log(err);
        })
        .finally(() => {
            renderTextButton(false, '.popup__button_avatar');
        })
    }
});

//добавление новой карточки
const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_card', 
    submitForm: (data) => {
        renderTextButton(true, '.popup__button_create');
        api.addNewCard(data).then((cardData) => {
            cardsList.addItem(createCard(cardData));
            popupAddCard.close();
        })
        .catch ((err) => {
            console.log(`При добавлении карточки:${err}`)
        })
        .finally(() => {
            renderTextButton(false, '.popup__button_create');
        })
    }
});

// работа попапов(открытие)

avatarUser.addEventListener('click', () => {
    formValidatorEditAvatar.resetValidator();
    popupEditAvatar.open();
})

infoButton.addEventListener('click', () => {
    const infoAboutUser = userInfo.getUserInfo();
    nameInputEdit.value = infoAboutUser.userName;
    jobInputEdit.value = infoAboutUser.personalInformation;
    formValidatorEdit.resetValidator();
    popupEditProfile.open();
});

buttonPlus.addEventListener('click', () => {
    formValidatorAdd.resetValidator();
    popupAddCard.open();
});

popupImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();






