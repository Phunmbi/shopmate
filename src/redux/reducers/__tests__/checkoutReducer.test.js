import checkout from '../checkout';
import {
  GET_SHIPPING_COSTS_FAILURE,
  GET_SHIPPING_COSTS,
  GET_SHIPPING_COSTS_SUCCESS,
  GET_SHIPPING_REGIONS_FAILURE,
  GET_SHIPPING_REGIONS,
  GET_SHIPPING_REGIONS_SUCCESS,
  CREATE_ORDER_FAILURE, CREATE_ORDER, CREATE_ORDER_SUCCESS, STRIPE_CHARGE_FAILURE, STRIPE_CHARGE, STRIPE_CHARGE_SUCCESS
} from "../../constants/actionTypes";

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

describe('Checkout Reducer', () => {
  it('returns initial state with unknown actions', () => {
    const unknownAction = {
      type: 'UNKNOWN TYPE'
    };
    expect(checkout(initialState, unknownAction)).toEqual(initialState);
  });

  it('updates the error with get Shipping cost failure', () => {
    const errorAction = {
      type: GET_SHIPPING_COSTS_FAILURE,
      error: true,
      loadingCost: false
    };
    expect(checkout(initialState, errorAction).error)
      .toBe(errorAction.error);
  });

  it('updates to loading while getting shipping cost', () => {
    const action = {
      type: GET_SHIPPING_COSTS,
      loadingCost: true
    };
    expect(checkout(initialState, action).loadingCost).toBe(true);
  });

  it('returns get shipping costs correctly', () => {
    const action = {
      type: GET_SHIPPING_COSTS_SUCCESS,
      payload: ['By air, 14 days $10'],
      loadingCost: false
    };
    expect(checkout(initialState, action).shippingCost).toEqual(['By air, 14 days $10']);
  });

  it('updates the error with get Shipping regions failure', () => {
    const errorAction = {
      type: GET_SHIPPING_REGIONS_FAILURE,
      error: true,
      loadingRegions: false
    };
    expect(checkout(initialState, errorAction).error)
      .toBe(errorAction.error);
  });

  it('updates to loading while getting shipping regions', () => {
    const action = {
      type: GET_SHIPPING_REGIONS,
      loadingRegions: true
    };
    expect(checkout(initialState, action).loadingRegions).toBe(true);
  });

  it('returns get shipping regions correctly', () => {
    const action = {
      type: GET_SHIPPING_REGIONS_SUCCESS,
      payload: ['US/ Canada'],
      loadingRegions: false
    };
    expect(checkout(initialState, action).shippingRegions).toEqual(['US/ Canada']);
  });

  it('updates the error with create order failure', () => {
    const errorAction = {
      type: CREATE_ORDER_FAILURE,
      error: true,
      creatingOrder: false
    };
    expect(checkout(initialState, errorAction).error)
      .toBe(errorAction.error);
  });

  it('updates to loading while creating order', () => {
    const action = {
      type: CREATE_ORDER,
      creatingOrder: true,
      orderId: null
    };
    expect(checkout(initialState, action).creatingOrder).toBe(true);
  });

  it('returns create order correctly', () => {
    const action = {
      type: CREATE_ORDER_SUCCESS,
      payload: {
        orderId: 4
      },
      creatingOrder: false
    };
    expect(checkout(initialState, action).orderId).toEqual(4);
  });

  it('updates the error with stripe charge failure', () => {
    const errorAction = {
      type: STRIPE_CHARGE_FAILURE,
      error: true,
      creatingStripeCharge: false
    };
    expect(checkout(initialState, errorAction).error)
      .toBe(errorAction.error);
  });

  it('updates to loading while creating stripe charge', () => {
    const action = {
      type: STRIPE_CHARGE,
      creatingStripeCharge: true
    };
    expect(checkout(initialState, action).creatingStripeCharge).toBe(true);
  });

  it('returns creates stripe charge correctly', () => {
    const action = {
      type: STRIPE_CHARGE_SUCCESS,
      payload: 'correctly',
      loadingCost: false
    };
    expect(checkout(initialState, action).stripeChargeResponse).toEqual('correctly');
  });
});
