// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

/**
 * These class methods are used to evaluate if user is logged in and other related methods
 */


// create a new class to instantiate for a user
class AuthService {
  // get user data from JSON web token by decoding it
  getProfile() {
    return decode(this.getToken());
  }

  // return `true` or `false` if token exists (does not verify if it's expired yet)
  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    // Decode idToken and save userId, roleId to localStorage variable
    const userData = decode(idToken)
    localStorage.setItem('userId', userData.data._id);
    localStorage.setItem('roleId', userData.data.roleId);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    // this will send user to home page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
