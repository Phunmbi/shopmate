import {
  GET_SHIPPING_REGIONS,
  GET_SHIPPING_REGIONS_FAILURE,
  GET_SHIPPING_REGIONS_SUCCESS,
  GET_SHIPPING_COSTS,
  GET_SHIPPING_COSTS_FAILURE,
  GET_SHIPPING_COSTS_SUCCESS,
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

export const getShippingCost = ( shoppingId ) => {
  return {
    type: GET_SHIPPING_COSTS,
    shoppingId,
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
