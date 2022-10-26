export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, handleCardLike, handleRemoveCardLike, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likeArray = data.likes;
    this._author = data.owner._id;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleRemoveCardLike = handleRemoveCardLike;
  };

    _getTemplate () {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;
    };

    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__title').textContent = this._name;
      this._imageCard =  this._element.querySelector('.element__image');
      this._imageCard.src = this._link;
      this._imageCard.alt = this._name;
      this._elementHeart = this._element.querySelector('.element__heart');
      this._likeButton = this._element.querySelector('.element__like');
      this._buttonRubbish =  this._element.querySelector('.element__delete');
      this._setEventListeners();
      this.updateDeleteButtonView();
      this.clickOnHeart(this._likeArray)
      return this._element;
      };
    
    _setEventListeners() {
      // обработчик события "поставить лайк"
      
      this._elementHeart.addEventListener('click', () => {
        this._handleLikeOnCard();
      });

      //Обработчик события "удалить карточку"
      this._buttonRubbish.addEventListener('click', () => {
        this._handleCardDelete(this._cardId, this);
    });

    // открытие карточки
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
  });
    };

    _handleLikeOnCard() {
      if(this.isLiked()){
        this._handleRemoveCardLike(this);
      } else {
        this._handleCardLike(this);
      }
    }

    clickOnHeart(likes) {
      this._likeArray = likes;
      this._likeButton.textContent = this._likeArray.length;
      if(this.isLiked()){
        this._elementHeart.classList.add('element__heart_active');
      } else {
        this._elementHeart.classList.remove('element__heart_active');
      }
  };

    isLiked() {
      return Boolean(this._likeArray.find(item => item._id === this._userId));
    }

    updateDeleteButtonView() {
      if(this._author === this._userId) {
       this._buttonRubbish.classList.remove('element__delete_inactive');
      } else {
        this._buttonRubbish.classList.add('element__delete_inactive')
      }
  }

    remove() {
      this._element.remove();
      this._element = null;
    };
    
}
