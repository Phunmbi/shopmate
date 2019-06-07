import {call, put, takeLatest} from 'redux-saga/effects';
import toast from 'toastr';
import {
  ADD_TO_CART,
  GET_CART_ID, REMOVE_FROM_CART,
  RETRIEVE_CART, UPDATE_CART,
} from '../constants/actionTypes'
import {
  getCartIdSuccess,
  getCartIdFailure,
  addToCartSuccess,
  addToCartFailure,
  retrieveCartSuccess,
  retrieveCartFailure,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateCartSuccess,
  updateCartFailure
} from '../actionCreator/shoppingCart';
import shoppingCartAPI from "../../services/shoppingCart";

export function* getCardIdSaga ( ) {
  try {
    const response = yield call( shoppingCartAPI.getCartId );
    localStorage.setItem("cart_id", response.data.cart_id);
    yield put( getCartIdSuccess( response.data ) );
  } catch ( error ) {
    toast.error( 'Failed to generate cart' );
    yield put( getCartIdFailure( error ) );
  }
}

export function* watchGetCartId () {
  yield takeLatest( GET_CART_ID, getCardIdSaga );
}

export function* addToCartSaga ( action ) {
  try {
    const { cart_id, product_id, attributes } = action
    const response = yield call( shoppingCartAPI.addToCart, {cart_id, product_id, attributes} );
    localStorage.setItem("addedToCart", "true");
    toast.success('Successfully added to cart');
    yield put( addToCartSuccess( response.data ) );
  } catch ( error ) {
    toast.error( 'Failed to add product to cart' );
    yield put( addToCartFailure( error ) );
  }
}

export function* watchAddToCart () {
  yield takeLatest( ADD_TO_CART, addToCartSaga );
}

export function* retrieveCartSaga ( action ) {
  try {
    const { cart_id } = action;
    const response = yield call( shoppingCartAPI.retrieveCart, cart_id );
    localStorage.setItem("addedToCart", "true");
    yield put( retrieveCartSuccess( response.data ) );
  } catch ( error ) {
    toast.error( 'Failed to retrieve cart' );
    yield put( retrieveCartFailure( error ) );
  }
}

export function* watchRetrieveCart () {
  yield takeLatest( RETRIEVE_CART, retrieveCartSaga );
}

export function* removeFromCartSaga ( action ) {
  try {
    const { item_id } = action;
    yield call( shoppingCartAPI.removeFromCart, item_id );
    yield put( removeFromCartSuccess( item_id ) );
    toast.success( 'Successfully removed item from' );
  } catch ( error ) {
    toast.error( 'Failed to remove item from cart' );
    yield put( removeFromCartFailure( error ) );
  }
}

export function* watchRemoveFromCart () {
  yield takeLatest( REMOVE_FROM_CART, removeFromCartSaga );
}

export function* updateCartSaga ( action ) {
  try {
    const { item_id, quantity } = action;
    const response = yield call( shoppingCartAPI.updateCart, {item_id, quantity} );
    yield put( updateCartSuccess( response.data ) );
    toast.success('Successfully updated cart');
  } catch ( error ) {
    toast.error( 'Failed to update cart' );
    yield put( updateCartFailure( error ) );
  }
}

export function* watchUpdateCart () {
  yield takeLatest( UPDATE_CART, updateCartSaga );
}
