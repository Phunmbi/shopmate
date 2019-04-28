import axios from 'axios';
import BaseAuthorization from './index';

export default class shoppingCartAPI {
  static getCartId ( ) {
    return axios.get( `${BaseAuthorization.baseURL}/shoppingcart/generateUniqueId`);
  }
  
  static addToCart (action) {
    const { cart_id, product_id, attributes } = action;
    return axios.post(`${BaseAuthorization.baseURL}/shoppingcart/add`, {
      cart_id,
      product_id,
      attributes
    });
  }
  
  static retrieveCart ( cart_id ) {
    return axios.get(`${BaseAuthorization.baseURL}/shoppingcart/${cart_id}`);
  }
  
  static removeFromCart (item_id) {
    return axios.delete(`${BaseAuthorization.baseURL}/shoppingcart/removeProduct/${item_id}`)
  }
}
