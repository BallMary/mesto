export default class UserInfo {
    constructor(userName, personalInformation) {
        this._userName = document.querySelector(userName);
        this._personalInformation = document.querySelector(personalInformation);
    }


    getUserInfo() {
        const userData = {
            userName: this._userName.textContent,
            personalInformation: this._personalInformation.textContent,
        };
        return userData;
    }

    setUserInfo(name, about) {
        this._userName.textContent = name;
        this._personalInformation.textContent = about;
    }
}