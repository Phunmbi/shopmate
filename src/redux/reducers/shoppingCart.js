import * as types from '../constants/actionTypes';

const initialState = {
  cart_Id: '',
  error: false,
  loadingShoppingCart: false,
  updatingShoppingCart: false,
  cart: []
};

const shoppingCart = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CART_ID_SUCCESS:
      return {
        ...state,
        loadingShoppingCart: false,
        cart_Id: action.payload.cart_id,
        error: false,
      };
    case types.GET_CART_ID_FAILURE:
      return {
        ...state,
        cart_Id: null,
        loadingShoppingCart: false,
        error: true,
      };
    case types.ADD_TO_CART:
    case types.RETRIEVE_CART:
    case types.REMOVE_FROM_CART:
    case types.GET_CART_ID:
      return {
        ...state,
        loadingShoppingCart: true,
        error: false,
      };
    case types.RETRIEVE_CART_SUCCESS:
    case types.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loadingShoppingCart: false,
        cart: [...action.payload],
        error: false,
      };
    case types.RETRIEVE_CART_FAILURE:
    case types.ADD_TO_CART_FAILURE:
    case types.REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        loadingShoppingCart: false,
        error: true
      };
    case types.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        loadingShoppingCart: false,
        error: false,
        cart: state.cart.filter((item) => item.item_id !== action.payload )
      };
    case types.UPDATE_CART:
      return {
      ...state,
        updatingShoppingCart: true,
      error: false,
    };
    case types.UPDATE_CART_FAILURE:
      return {
        ...state,
        updatingShoppingCart: false,
        error: true,
      };
    case types.UPDATE_CART_SUCCESS:
      return {
        ...state,
        updatingShoppingCart: true,
        error: false,
        cart: [...action.payload],
      };
    default:
      return state;
  }
};

export default shoppingCart;
