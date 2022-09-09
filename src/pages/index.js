import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { enableValidation } from "../utils/enableValidation.js";
import { formElementEdit, avatarUser, formElementEditAvatar, nameInputEdit, jobInputEdit, popupCard, buttonPlus, infoButton, nameProfile, aboutProfile, avatarProfile } from '../utils/constants.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

const config = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-49',
    authorization: '1e48dbc6-37cc-48db-9381-9e3b15425711',
};
const api = new Api(config);
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

// Для каждой проверяемой формы создали экземпляр класса FormValidator
const formValidatorEdit = new FormValidator(enableValidation, formElementEdit);
const formValidatorAdd = new FormValidator(enableValidation, popupCard);
const formValidatorEditAvatar = new FormValidator(enableValidation, formElementEditAvatar);
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorEditAvatar.enableValidation();

const popupImage = new PopupWithImage('.popup_open-photo');
popupImage.setEventListeners();

const openImage = (name, link) => {
    popupImage.open(name, link);
};

async function handleCardLike(cardId) {
    try {
        await api.likeCard(cardId);
    }
    catch(err) {
        console.log(err);
    }
    }

async function handleRemoveCardLike(cardId) {
    try {
        await api.removeLikeCard(cardId);
    }
    catch(err) {
        console.log(err);
    }
}

async function handleDelete (cardId, cardElement) {
    try {
        await api.deleteCard(cardId); 
        cardElement.remove();
        popupDeleteCard.close();
    }
    catch(err) {
        console.log(`При удалении карточки:${err}`)
    } 
}

const popupDeleteCard = new PopupWithConfirmation('.popup_confirm', handleDelete);
popupDeleteCard.setEventListeners();
const openCardDelete = (cardId, cardElement) => {
    popupDeleteCard.open();
    popupDeleteCard.submitCard(cardId, cardElement);
   
}
// Функция создание карточки
const createCard = (item) => {
    const card = new Card(item, '.template', openImage, openCardDelete, handleCardLike, handleRemoveCardLike);
    const cardElement = card.generateCard();
    return cardElement;
};


const cardsList = new Section({
    renderer: (item) => {
        const card = createCard(item);
        cardsList.addItem(card);
    },
},
".elements"
);



api.getUserInfo().then((data) => {
    nameProfile.textContent = data.name;
    aboutProfile.textContent = data.about;
    avatarProfile.src = data.avatar;
});

const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_edit',
    submitForm: async (data) => {
        try {
            await api.editUserInfo(data);
            userInfo.setUserInfo(data.name, data.about);
        }
        catch (err) {
            console.log(err);
        }
    }});

    const popupEditAvatar = new PopupWithForm({
        popupSelector: '.popup_edit-avatar',
        submitForm: async (data) => {
            try {
                await api.editAvatar(data.avatar);
            }
            catch (err) {
                console.log(err);
            }
           
        }});

 api.getCards().then((data) => {
    cardsList.renderItems(data);
    });
    
//добавление новой карточки
const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_card', 
    submitForm: async (data) => {
        try {
            await api.addNewCard(data);
            cardsList.addItem(createCard(data));
        }
        catch(err) {
            console.log(`При добавлении карточки:${err}`)
        }
        }});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();

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








