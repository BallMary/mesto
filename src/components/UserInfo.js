export default class UserInfo {
    constructor(userName, personalInformation) {
        this._userName = userName;
        this._personalInformation = personalInformation;
    }


    getUserInfo() {
        const userData = {
        userName: this._userName.textContent,
        personalInformation: this._personalInformation.textContent,
        };
        return userData;
    }

    setUserInfo(userName, aboutUser) {
        this._userName.textContent = userName.value;
        this._personalInformation.textContent = aboutUser.value;
    }
}
