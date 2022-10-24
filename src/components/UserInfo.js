export default class UserInfo {
    constructor(userName, personalInformation, userAvatar) {
        this._userName = userName;
        this._personalInformation = personalInformation;
        this._userAvatar = userAvatar;
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

    setAvatar(avatar) {
        this._userAvatar.src = avatar;
    }
}