import axios from 'axios';
import BaseAuthorization from './index';

export default class AuthAPI {
  static signup ( action ) {
    const {Name, Email, Password} = action;
    return axios.post( `${BaseAuthorization.baseURL}/customers`, {
      name: Name,
      email: Email,
      password: Password
    } );
  }

  static signin ( action ) {
    const {Email, Password} = action;
		return axios.post(`${BaseAuthorization.baseURL}/customers/login`, {
      email: Email,
      password: Password
		});
  }
  
  static getUser() {
    return axios.get(`${BaseAuthorization.baseURL}/customer`, {headers: BaseAuthorization.token})
  }
}
