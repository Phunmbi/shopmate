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
    return axios.get(`${BaseAuthorization.baseURL}/customer`, {
      headers: BaseAuthorization.token,
    })
  }

  static updateUser(action) {
    const {
      address_1,
      address_2,
      city,
      region,
      country,
      postal_code,
      shipping_region_id
    } = action;
    return axios.put(`${BaseAuthorization.baseURL}/customers/address`, {
      address_1,
      address_2,
      city,
      region,
      country,
      postal_code,
      shipping_region_id
    }, {headers: BaseAuthorization.token})
  }
}
