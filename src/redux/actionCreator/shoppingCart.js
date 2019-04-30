import {
  ADD_TO_CART,
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  GET_CART_ID,
  GET_CART_ID_FAILURE,
  GET_CART_ID_SUCCESS,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_FAILURE,
  REMOVE_FROM_CART_SUCCESS,
  RETRIEVE_CART,
  RETRIEVE_CART_FAILURE,
  RETRIEVE_CART_SUCCESS,
  UPDATE_CART,
  UPDATE_CART_FAILURE,
  UPDATE_CART_SUCCESS,
} from "../constants/actionTypes";

export const getCartId = ( ) => {
  return {
    type: GET_CART_ID,
  };
};

export const getCartIdSuccess = data => {
  return {
    type: GET_CART_ID_SUCCESS,
    payload: data,
  };
};

export const getCartIdFailure = error => {
  return {
    type: GET_CART_ID_FAILURE,
    payload: error,
  };
};

export const addToCart = ( {cart_id, product_id, attributes} ) => {
  return {
    type: ADD_TO_CART,
    cart_id,
    product_id,
    attributes
  };
};

export const addToCartSuccess = data => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: data,
  };
};

export const addToCartFailure = error => {
  return {
    type: ADD_TO_CART_FAILURE,
    payload: error,
  };
};

export const retrieveCart = ( cart_id ) => {
  return {
    type: RETRIEVE_CART,
    cart_id,
  };
};

export const retrieveCartSuccess = data => {
  return {
    type: RETRIEVE_CART_SUCCESS,
    payload: data,
  };
};

export const retrieveCartFailure = error => {
  return {
    type: RETRIEVE_CART_FAILURE,
    payload: error,
  };
};

export const removeFromCart = ( item_id ) => {
  return {
    type: REMOVE_FROM_CART,
    item_id,
  };
};

export const removeFromCartSuccess = data => {
  return {
    type: REMOVE_FROM_CART_SUCCESS,
    payload: data,
  };
};

export const removeFromCartFailure = error => {
  return {
    type: REMOVE_FROM_CART_FAILURE,
    payload: error,
  };
};

export const updateCart = ( {item_id, quantity} ) => {
  return {
    type: UPDATE_CART,
    item_id,
    quantity
  };
};

export const updateCartSuccess = data => {
  return {
    type: UPDATE_CART_SUCCESS,
    payload: data,
  };
};

export const updateCartFailure = error => {
  return {
    type: UPDATE_CART_FAILURE,
    payload: error,
  };
};
