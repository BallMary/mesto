export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, handleCardLike, handleRemoveCardLike) {
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes ? data.likes.length : 0;
    this._likeArray = data.likes ? data.likes : data.likes = [];
    this._author = data.owner ? data.owner._id : 0;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
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
      
    // вернём DOM-элемент карточки
      return cardElement;
    };

    _setEventListeners() {
      // обработчик события "поставить лайк"
      this._elementHeart = this._element.querySelector('.element__heart');
      this._buttonRubbish =  this._element.querySelector('.element__delete');
      

      this._elementHeart.addEventListener('click', () => {
        this._handleHeartClick();
      });

      //Обработчик события "удалить карточку"
      this._buttonRubbish.addEventListener('click', () => {
        this._handleCardDelete(this._cardId, this._element);
    });



    // открытие карточки
    this._imageCard.addEventListener('click', () => {
      this._handleOpenImagePopupClick();
  });
    };

    _handleHeartClick() {
      if(this.isLiked()) {
        this._handleRemoveCardLike(this._cardId);
        this._elementHeart.classList.remove('element__heart_active');
      } else {
        this._handleCardLike(this._cardId);
        this._elementHeart.classList.toggle('element__heart_active');
      };
    };

    isLiked() {
        return Boolean(this._likeArray.find(item => item._id === "4770785ea931fe94cc0c3b71"));
    }

    _hideRubbish() {
      if(this._author !== "4770785ea931fe94cc0c3b71") {
       this._buttonRubbish.remove();
      }
  }

  _colorHeart() {
    if(this.isLiked()) {
      this._elementHeart.classList.toggle('element__heart_active');
    } else {
      this._elementHeart.classList.remove('element__heart_active');
    };
  };
  

    _handleOpenImagePopupClick(){
      this._handleCardClick(this._name, this._link);
  };
    
  generateCard() {
    // Запишем разметку в приватное поле _element
    // Чтобы у других элементов появился доступ к ней
    this._element = this._getTemplate();
    // Добавим слушатели
    this._imageCard =  this._element.querySelector('.element__image');
    this._setEventListeners();
    this._hideRubbish();
    this._colorHeart();
    // if(this.isLiked == false) {
    //   this._elementHeart.classList.remove('element__heart_active');)

    // Добавим данные в карточку
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like').textContent = this._likesCount;
    return this._element;
    };
  }
