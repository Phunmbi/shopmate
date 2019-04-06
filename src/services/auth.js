import axios from 'axios';
import baseURL from './index';

export default class AuthAPI {
  static signup ( action ) {
    const {Name, Email, Password} = action;
    return axios.post( `${baseURL}/customers`, {
      name: Name,
      email: Email,
      password: Password
    } );
  }

  static signin ( action ) {
    const {Email, Password} = action;
		return axios.post(`${baseURL}/customers/login`, {
      email: Email,
      password: Password
		});
  }
}
