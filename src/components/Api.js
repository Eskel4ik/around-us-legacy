export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    sendCardData(item) {
        this._name = item.name;
        this._link = item.link;
        return fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: this._name,
                    link: this._link
                })
            })
            .then(this._checkResponce);
    }
    setUserInfo({ name, about, avatar }) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    about,
                    avatar
                })
            })
            .then(this._checkResponce);
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._checkResponce);
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: "GET",
                headers: this._headers
            })
            .then(this._checkResponce);
    }
    deleteCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponce);
    }
    likeAdd(data) {
        return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkResponce);
    }
    likeDelete(data) {
        return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponce);
    }
    editProfilePhoto(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data
            })
        }).then(this._checkResponce);
    }
    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
}