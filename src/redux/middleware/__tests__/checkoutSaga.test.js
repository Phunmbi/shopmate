import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import toast from 'toastr';
import CheckoutAPI from '../../../services/checkout';
import { watchCreateOrder, watchGetShippingCost, watchGetShippingRegions, watchStripeCharge } from '../checkoutSaga';

const error = new Error('Possible network error, please reload the page');

const response = {
  data: {
    shipping_id: 4,
    shipping_region_id: 2
  }
};

const action = {
  cart_id: 2,
  shipping_id: 4,
  shipping_region_id: 2,
  stripeToken: 'tok_6483',
  order_id: 443,
  description: 'consider it described',
  amount: 4000
};

const { shipping_region_id, cart_id, shipping_id, stripeToken, order_id, description, amount } = action;

const history = jest.fn();
toast.error = jest.fn();
toast.success = jest.fn();

describe('Checkout Saga', () => {
  describe('Shipping Regions saga', () => {
    it('fetches shipping region', () => {
      return expectSaga(watchGetShippingRegions, CheckoutAPI)
        .provide([[call(CheckoutAPI.getShippingRegions,), response]])
        .put({
          type: 'GET_SHIPPING_REGIONS_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'GET_SHIPPING_REGIONS',
        })
        .silentRun();
    });

    it('throws error if there is an error fetching shipping regions', () => {
      return expectSaga(watchGetShippingRegions, CheckoutAPI)
        .provide([[matchers.call.fn(CheckoutAPI.getShippingRegions), throwError(error)]])
        .put({
          type: 'GET_SHIPPING_REGIONS_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'GET_SHIPPING_REGIONS',
        })
        .silentRun();
    });
  });

  describe('Shipping Costs Saga', () => {
    it('fetches shipping costs', () => {
      return expectSaga(watchGetShippingCost, CheckoutAPI)
        .provide([[call(CheckoutAPI.getShippingCost, { shipping_region_id }), response]])
        .put({
          type: 'GET_SHIPPING_COSTS_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'GET_SHIPPING_COSTS',
          shipping_region_id
        })
        .silentRun();
    });

    it('throws error if there is an error fetching shipping costs', () => {
      return expectSaga(watchGetShippingCost, CheckoutAPI)
        .provide([[matchers.call.fn(CheckoutAPI.getShippingCost), throwError(error)]])
        .put({
          type: 'GET_SHIPPING_COSTS_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'GET_SHIPPING_COSTS',
          shipping_region_id
        })
        .silentRun();
    });
  });

  describe('Create Order saga', () => {
    it('creates a new order', () => {
      return expectSaga(watchCreateOrder, CheckoutAPI)
        .provide([[call(CheckoutAPI.createOrder, { cart_id, shipping_id } ), response]])
        .put({
          type: 'CREATE_ORDER_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'CREATE_ORDER',
          cart_id,
          shipping_id
        })
        .silentRun();
    });

    it('throws error if there is an error creating a new order', () => {
      return expectSaga(watchCreateOrder, CheckoutAPI)
        .provide([[matchers.call.fn(CheckoutAPI.createOrder), throwError(error)]])
        .put({
          type: 'CREATE_ORDER_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'CREATE_ORDER',
          cart_id,
          shipping_id
        })
        .silentRun();
    });
  });

  describe('Stripe Charge saga', () => {
    it('creates a stripe charge', () => {
      return expectSaga(watchStripeCharge, CheckoutAPI)
        .provide([[call(CheckoutAPI.stripeCharge, { stripeToken, order_id, description, amount }), response]])
        .put({
          type: 'STRIPE_CHARGE_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'STRIPE_CHARGE', stripeToken, order_id, description, amount, history
        })
        .silentRun();
    });

    it('throws error if there is an error creating a stripe charge', () => {
      return expectSaga(watchStripeCharge, CheckoutAPI)
        .provide([[matchers.call.fn(CheckoutAPI.stripeCharge), throwError(error)]])
        .put({
          type: 'STRIPE_CHARGE_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'STRIPE_CHARGE', stripeToken, order_id, description, amount, history
        })
        .silentRun();
    });
  });
});
