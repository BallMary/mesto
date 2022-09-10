export default class Api {
    constructor(config) {
        this.url = config.url;
        this.authorization = config.authorization;
    }

    _checkResponse(response) {
        if (response.ok) {
          return response.json();
        };
        return Promise.reject(`Ошибка: ${response.status}`);
      };

    //отображение данных профиля с сервера
    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
                method: "GET",
                headers: {
                    authorization: `${this.authorization}`,
                }
            })
            .then(this._checkResponse);
        };

    editUserInfo(data) {
         return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     name: data.name,
            //     about: data.about
            // })
            body: JSON.stringify(data)
            })
           .then(this._checkResponse);
    }

    //отображение карточек с сервера
    getCards() {
        return fetch(`${this.url}/cards`, {
                method: "GET",
                headers: {
                    authorization: `${this.authorization}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(this._checkResponse);
    }


    addNewCard(data) {
        return fetch(`${this.url}/cards`, {
                method: 'POST',
                headers: {
                    authorization: `${this.authorization}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                })
                .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this.authorization}`,
                },
                })
                .then(this._checkResponse);
    }

    likeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
                 method: 'PUT',
                headers: {
                     authorization: `${this.authorization}`,
                },
                })
                .then(this._checkResponse);
    }

    removeLikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'DELETE',
           headers: {
                authorization: `${this.authorization}`,
           },
           })
           .then(this._checkResponse);
    }

     editAvatar(avatar) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
avatar: avatar
        }),
            })
            .then(this._checkResponse);
    }
};

   




