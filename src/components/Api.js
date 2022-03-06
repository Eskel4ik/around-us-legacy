export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: "GET",
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            })
            .then((value) => {
                return value;
            })
            .catch((err) => {
                console.log(err);
            })

    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
            .then(res => res.json())
            .then((result) => {
                //console.log(result);
            });
    }

    // other methods for working with the API
}