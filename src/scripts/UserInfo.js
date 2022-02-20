export default class UserInfo {
    constructor({ userName, userInfo }) {
        this._name = userName;
        this._about = userInfo;
    }
    getUserInfo() {
        this._userData = { name: `${this._name.textContent}`, about: `${this._about.textContent}` };
        return this._userData;
    }
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }
}