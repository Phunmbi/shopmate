import * as types from '../constants/actionTypes';

const initialState = {
  shippingRegions: [],
  shippingCost: [],
  error: false,
  loadingCost: false,
  loadingRegions: false,
  creatingOrder: false,
  orderId: null,
  creatingStripeCharge: false,
  stripeChargeResponse: null,
};

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SHIPPING_COSTS:
      return {
        ...state,
        loadingCost: true,
        shippingCost: [],
        error: false,
      };
    case types.GET_SHIPPING_REGIONS:
      return {
        ...state,
        loadingRegions: true,
        shippingRegions: [],
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
        shippingRegions: [],
        error: true,
      };
    case types.GET_SHIPPING_REGIONS_FAILURE:
      return {
        ...state,
        loadingRegions: false,
        shippingCost: [],
        error: true,
      };
    case types.CREATE_ORDER:
      return {
        ...state,
        creatingOrder: true,
        orderId: null,
        error: false,
      };
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        creatingOrder: false,
        orderId: action.payload.orderId,
        error: false,
      };
    case types.CREATE_ORDER_FAILURE:
      return {
        ...state,
        creatingOrder: false,
        error: true,
      };case types.STRIPE_CHARGE:
      return {
        ...state,
        creatingStripeCharge: true,
        stripeChargeResponse: null,
        error: false,
      };
    case types.STRIPE_CHARGE_SUCCESS:
      return {
        ...state,
        creatingStripeCharge: false,
        stripeChargeResponse: action.payload,
        error: false,
      };
    case types.STRIPE_CHARGE_FAILURE:
      return {
        ...state,
        creatingStripeCharge: false,
        error: true,
      };
    default:
      return state;
  }
};

export default checkout;
