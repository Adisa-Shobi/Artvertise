const USER_KEY = 'auth-user';

class StorageService {

  static clean () {
    window.sessionStorage.clear();
  }

  static saveUser (user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getUser () {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  static isLoggedIn () {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user){
      return true
    }
    return false;
  }
}

module.exports = StorageService;
