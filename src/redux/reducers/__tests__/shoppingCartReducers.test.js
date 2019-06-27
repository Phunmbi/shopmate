import shoppingCart from '../shoppingCart';
import {
  ADD_TO_CART, ADD_TO_CART_FAILURE, ADD_TO_CART_SUCCESS,
  GET_CART_ID_FAILURE,
  GET_CART_ID_SUCCESS, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_SUCCESS,
  RETRIEVE_CART_FAILURE, RETRIEVE_CART_SUCCESS, UPDATE_CART, UPDATE_CART_FAILURE, UPDATE_CART_SUCCESS
} from "../../constants/actionTypes";

const initialState = {
  cart_Id: '',
  error: false,
  loadingShoppingCart: false,
  updatingShoppingCart: false,
  cart: []
};

describe('Shopping Cart Reducer', () => {
  it('returns initial state with unknown actions', () => {
    const unknownAction = {
      type: 'UNKNOWN TYPE'
    };
    expect(shoppingCart(initialState, unknownAction)).toEqual(initialState);
  });

  it('updates the error with get cart id failure', () => {
    const errorAction = {
      type: GET_CART_ID_FAILURE,
      error: true,
      loadingShoppingCart: false
    };
    expect(shoppingCart(initialState, errorAction).error)
      .toBe(true);
  });

  it('updates to loading while adding to cart', () => {
    const action = {
      type: ADD_TO_CART,
      loadingShoppingCart: true
    };
    expect(shoppingCart(initialState, action).loadingShoppingCart).toBe(true);
  });

  it('returns get cart id correctly', () => {
    const action = {
      type: GET_CART_ID_SUCCESS,
      payload: {
        cart_id: 5
      },
      loadingShoppingCart: false
    };
    expect(shoppingCart(initialState, action).cart_Id).toEqual(5);
  });

  it('updates the error with retrieve cart failure', () => {
    const errorAction = {
      type: RETRIEVE_CART_FAILURE,
      error: true,
      loadingShoppingCart: false
    };
    expect(shoppingCart(initialState, errorAction).error)
      .toBe(errorAction.error);
  });

  it('updates to loading while updating cart', () => {
    const action = {
      type: UPDATE_CART,
      updatingShoppingCart: true
    };
    expect(shoppingCart(initialState, action).updatingShoppingCart).toBe(true);
  });

  it('returns retrieve cart correctly', () => {
    const action = {
      type: RETRIEVE_CART_SUCCESS,
      payload: ['carts'],
      loadingShoppingCart: false
    };
    expect(shoppingCart(initialState, action).cart).toEqual(['carts']);
  });

  it('updates the error with add to cart failure', () => {
    const errorAction = {
      type: ADD_TO_CART_FAILURE,
      error: true,
      loadingShoppingCart: false
    };
    expect(shoppingCart(initialState, errorAction).error)
      .toBe(errorAction.error);
  });

  it('returns add to cart correctly', () => {
    const action = {
      type: ADD_TO_CART_SUCCESS,
      payload:['carts added'],
      loading: false
    };
    expect(shoppingCart(initialState, action).cart).toEqual(['carts added']);
  });

  it('returns remove from cart correctly', () => {
    const state = {
      cart: [{id: 4}]
    };

    const action = {
      type: REMOVE_FROM_CART_SUCCESS,
      payload: 2,
      loadingShoppingCart: false
    };
    expect(shoppingCart(state, action).cart).toEqual([{id: 4}]);
  });

  it('updates the error with remove from cart failure', () => {
    const errorAction = {
      type: REMOVE_FROM_CART_FAILURE,
      error: true,
      loadingShoppingCart: false
    };
    expect(shoppingCart(initialState, errorAction).error)
      .toBe(errorAction.error);
  });

  it('returns update cart correctly', () => {
    const action = {
      type: UPDATE_CART_SUCCESS,
      payload: ['cart updated'],
      updatingShoppingCart: false
    };
    expect(shoppingCart(initialState, action).cart).toEqual(['cart updated']);
  });

  it('updates the error with update cart failure', () => {
    const errorAction = {
      type: UPDATE_CART_FAILURE,
      error: true,
      updatingShoppingCart: false
    };
    expect(shoppingCart(initialState, errorAction).error)
      .toBe(errorAction.error);
  });
});
