import * as types from '../constants/actionTypes';

const initialState = {
  shippingRegions: [],
  shippingCost: [],
  error: false,
  loadingCost: false,
  loadingRegions: false
};

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SHIPPING_COSTS:
      return {
        ...state,
        loadingCost: true,
        error: false,
      };
    case types.GET_SHIPPING_REGIONS:
      return {
        ...state,
        loadingRegions: true,
        error: false,
      };
    case types.GET_SHIPPING_COSTS_SUCCESS:
      return {
        ...state,
        loadingCost: false,
        shippingCost: [...action.payload],
        error: false,
      };
    case types.GET_SHIPPING_REGIONS_SUCCESS:
      return {
        ...state,
        loadingRegions: false,
        shippingRegions: [...action.payload],
        error: false,
      };
    case types.GET_SHIPPING_COSTS_FAILURE:
      return {
        ...state,
        loadingCost: false,
        error: true,
      };
    case types.GET_SHIPPING_REGIONS_FAILURE:
      return {
        ...state,
        loadingRegions: false,
        error: true,
      };
    default:
      return state;
  }
};

export default checkout;
