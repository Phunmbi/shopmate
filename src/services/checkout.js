import axios from 'axios';
import BaseAuthorization from './index';

export default class CheckoutAPI {
  static getShippingRegions ( ) {
    console.log('services, check!');
    return axios.get( `${BaseAuthorization.baseURL}/shipping/regions`);
  }
  
  static getShippingCost ( action ) {
    const {shippingId} = action;
    return axios.get(`${BaseAuthorization.baseURL}/customers/login`, {
      shippingId: shippingId
    });
  }
}
