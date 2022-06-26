export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      this._elementHeart.addEventListener('click', () => {
        this._handleHeartClick();
      });

      //Обработчик события "удалить карточку"
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._handleRemoveClick();
    });

    // открытие карточки
    this._imageCard.addEventListener('click', () => {
      this._handleOpenImagePopupClick();
  });
    };

    _handleHeartClick() {
      this._elementHeart.classList.toggle('element__heart_active');
    };

    _handleRemoveClick() {
      this._element.remove();
      this._element = null;
    };

    _handleOpenImagePopupClick(){
      elementImage(this._name, this._link);
  };
    
  generateCard() {
    // Запишем разметку в приватное поле _element
    // Чтобы у других элементов появился доступ к ней
    this._element = this._getTemplate();
    // Добавим слушатели
    this._imageCard =  this._element.querySelector('.element__image');
    this._setEventListeners();

    // Добавим данные в карточку
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
    };
  };