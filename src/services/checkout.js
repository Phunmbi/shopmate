import axios from 'axios';
import BaseAuthorization from './index';

export default class CheckoutAPI {
  static getShippingRegions ( ) {
    return axios.get( `${BaseAuthorization.baseURL}/shipping/regions`);
  }
  
  static getShippingCost ( action ) {
    const {shipping_region_id} = action;
    return axios.get(`${BaseAuthorization.baseURL}/shipping/regions/${shipping_region_id}`);
  }

  static createOrder (action) {
    const { cart_id, shipping_id } = action;
    return axios.post(`${BaseAuthorization.baseURL}/orders`, {
      cart_id,
      shipping_id,
      tax_id: 1
    }, {headers: BaseAuthorization.token})
  }

  static stripeCharge (action) {
    const { stripeToken, order_id, description, amount } = action;
    return axios.post(`${BaseAuthorization.baseURL}/stripe/charge`, {
      stripeToken,
      order_id,
      description,
      amount,
      currency: "GBP"
    }, {headers: BaseAuthorization.token})
  }
}
