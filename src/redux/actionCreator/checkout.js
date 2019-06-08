import {
  GET_SHIPPING_REGIONS,
  GET_SHIPPING_REGIONS_FAILURE,
  GET_SHIPPING_REGIONS_SUCCESS,
  GET_SHIPPING_COSTS,
  GET_SHIPPING_COSTS_FAILURE,
  GET_SHIPPING_COSTS_SUCCESS,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  STRIPE_CHARGE,
  STRIPE_CHARGE_SUCCESS,
  STRIPE_CHARGE_FAILURE,
} from '../constants/actionTypes';

export const getShippingRegions = () => {
  return {
    type: GET_SHIPPING_REGIONS,
  };
};

export const getShippingRegionsSuccess = data => {
  return {
    type: GET_SHIPPING_REGIONS_SUCCESS,
    payload: data,
  };
};

export const getShippingRegionsFailure = error => {
  return {
    type: GET_SHIPPING_REGIONS_FAILURE,
    payload: error,
  };
};

export const getShippingCost = ( shipping_region_id ) => {
  return {
    type: GET_SHIPPING_COSTS,
    shipping_region_id,
  };
};

export const getShippingCostSuccess = data => {
  return {
    type: GET_SHIPPING_COSTS_SUCCESS,
    payload: data,
  };
};

export const getShippingCostFailure = error => {
  return {
    type: GET_SHIPPING_COSTS_FAILURE,
    payload: error,
  };
};

export const createOrder = ( {cart_id, shipping_id} ) => {
  return {
    type: CREATE_ORDER,
    cart_id,
    shipping_id,
  };
};

export const createOrderSuccess = data => {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: data,
  };
};

export const createOrderFailure = error => {
  return {
    type: CREATE_ORDER_FAILURE,
    payload: error,
  };
};

export const stripeCharge = ( {stripeToken, order_id, description, amount, history} ) => {
  return {
    type: STRIPE_CHARGE,
    stripeToken,
    order_id,
    description,
    amount,
    history
  };
};

export const stripeChargeSuccess = data => {
  return {
    type: STRIPE_CHARGE_SUCCESS,
    payload: data,
  };
};

export const stripeChargeFailure = error => {
  return {
    type: STRIPE_CHARGE_FAILURE,
    payload: error,
  };
};
