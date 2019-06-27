import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import toast from 'toastr';
import ShoppingCartAPI from '../../../services/shoppingCart';
import {
  watchAddToCart, watchGetCartId, watchRemoveFromCart, watchRetrieveCart, watchUpdateCart
} from '../shoppingCartSaga';

const error = new Error('Possible network error, please reload the page');

const response = {
  data: {}
};

const action = {
  cart_id: 2,
  product_id: 23,
  attributes: ['XL', 'Green'],
  item_id: 2,
  quantity: 2
};

const { cart_id, product_id, attributes, item_id, quantity } = action;

toast.error = jest.fn();
toast.success = jest.fn();

describe('Shopping Cart Saga', () => {
  describe('Get CardId Saga', () => {
    it('fetches cardId', () => {
      return expectSaga(watchGetCartId, ShoppingCartAPI)
        .provide([[call(ShoppingCartAPI.getCartId), response]])
        .put({
          type: 'GET_CART_ID_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'GET_CART_ID'
        })
        .silentRun();
    });

    it('throws error if there is an error fetching cardId', () => {
      return expectSaga(watchGetCartId, ShoppingCartAPI)
        .provide([[matchers.call.fn(ShoppingCartAPI.getCartId), throwError(error)]])
        .put({
          type: 'GET_CART_ID_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'GET_CART_ID'
        })
        .silentRun();
    });
  });

  describe('Add to Cart Saga', () => {
    it("adds to cart", () => {
      return expectSaga(watchAddToCart, ShoppingCartAPI)
        .provide([[call(ShoppingCartAPI.addToCart, { cart_id, product_id, attributes }), response]])
        .put({
          type: 'ADD_TO_CART_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'ADD_TO_CART', cart_id, product_id, attributes
        })
        .silentRun();
    });

    it('throws error if there is an error adding to cart', () => {
      return expectSaga(watchAddToCart, ShoppingCartAPI)
        .provide([[matchers.call.fn(ShoppingCartAPI.addToCart), throwError(error)]])
        .put({
          type: 'ADD_TO_CART_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'ADD_TO_CART', cart_id, product_id, attributes
        })
        .silentRun();
    });
  });

  describe('Retrieve Cart Saga', () => {
    it('retrieves the cart', () => {
      return expectSaga(watchRetrieveCart, ShoppingCartAPI)
        .provide([[call(ShoppingCartAPI.retrieveCart,  cart_id ), response]])
        .put({
          type: 'RETRIEVE_CART_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'RETRIEVE_CART', cart_id
        })
        .silentRun();
    });

    it('throws error if there is an error retrieving the cart', () => {
      return expectSaga(watchRetrieveCart, ShoppingCartAPI)
        .provide([[matchers.call.fn(ShoppingCartAPI.retrieveCart), throwError(error)]])
        .put({
          type: 'RETRIEVE_CART_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'RETRIEVE_CART', cart_id
        })
        .silentRun();
    });
  });

  describe('Remove from CartSaga', () => {
    it('removes from cart', () => {
      return expectSaga(watchRemoveFromCart, ShoppingCartAPI)
        .provide([[call(ShoppingCartAPI.removeFromCart, item_id ), response]])
        .put({
          type: 'REMOVE_FROM_CART_SUCCESS',
          payload: item_id
        })
        .dispatch({
          type: 'REMOVE_FROM_CART', item_id
        })
        .silentRun();
    });

    it('throws error if there is an error removing from cart', () => {
      return expectSaga(watchRemoveFromCart, ShoppingCartAPI)
        .provide([[matchers.call.fn(ShoppingCartAPI.removeFromCart), throwError(error)]])
        .put({
          type: 'REMOVE_FROM_CART_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'REMOVE_FROM_CART', item_id
        })
        .silentRun();
    });
  });

  describe('Update Cart Saga', () => {
    it('updates cart', () => {
      return expectSaga(watchUpdateCart, ShoppingCartAPI)
        .provide([[call(ShoppingCartAPI.updateCart, { item_id, quantity }), response]])
        .put({
          type: 'UPDATE_CART_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'UPDATE_CART', item_id, quantity
        })
        .silentRun();
    });

    it('throws error if there is an error updating cart', () => {
      return expectSaga(watchUpdateCart, ShoppingCartAPI)
        .provide([[matchers.call.fn(ShoppingCartAPI.updateCart), throwError(error)]])
        .put({
          type: 'UPDATE_CART_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'UPDATE_CART', item_id, quantity
        })
        .silentRun();
    });
  });
});
