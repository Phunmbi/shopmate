import {call, put, takeLatest} from 'redux-saga/effects';
import toast from 'toastr';
import CheckoutAPI from '../../services/checkout';
import {CREATE_ORDER, GET_SHIPPING_COSTS, GET_SHIPPING_REGIONS, STRIPE_CHARGE} from "../constants/actionTypes";
import {
  createOrderFailure,
  createOrderSuccess,
  getShippingCostFailure,
  getShippingCostSuccess,
  getShippingRegionsFailure,
  getShippingRegionsSuccess, stripeChargeFailure, stripeChargeSuccess
} from "../actionCreator/checkout";

export function* getShippingRegionsSaga (  ) {
  try {
    const response = yield call( CheckoutAPI.getShippingRegions );
    
    yield put( getShippingRegionsSuccess( response.data ) );
  } catch ( error ) {
    toast.error('Error retrieving shipping regions');
    yield put( getShippingRegionsFailure( error ) );
  }
}

export function* watchGetShippingRegions () {
  yield takeLatest( GET_SHIPPING_REGIONS, getShippingRegionsSaga );
}

export function* getShippingCostSaga ( action ) {
  try {
    const {shipping_region_id} = action;
    const response = yield call( CheckoutAPI.getShippingCost, { shipping_region_id} );
    yield put( getShippingCostSuccess( response.data ) );
  } catch ( error ) {
    toast.error( 'Error retrieving shipping costs' );
    yield put( getShippingCostFailure( error ) );
  }
}

export function* watchGetShippingCost () {
  yield takeLatest( GET_SHIPPING_COSTS, getShippingCostSaga );
}

export function* createOrderSaga ( action ) {
  try {
    const {cart_id, shipping_id} = action;
    const response = yield call( CheckoutAPI.createOrder, { cart_id, shipping_id} );
    yield put( createOrderSuccess( response.data ) );

    // Garbage collect and clean local storage while retaining user's login details
    const accessToken = localStorage.getItem("accessToken");
    const name = localStorage.getItem("name");
    const cartTotal = localStorage.getItem("cartTotal");
    localStorage.clear();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("name", name);
    localStorage.setItem("cartTotal", cartTotal);
  } catch ( error ) {
    toast.error( 'Error creating this order' );
    yield put( createOrderFailure( error ) );
  }
}

export function* watchCreateOrder () {
  yield takeLatest( CREATE_ORDER, createOrderSaga );
}

export function* stripeChargeSaga ( action ) {
  try {
    const {stripeToken, order_id, description, amount, history} = action;
    const response = yield call( CheckoutAPI.stripeCharge, { stripeToken, order_id, description, amount } );
    yield put( stripeChargeSuccess( response.data ) );
    toast.success('Your payment has been processed successfully');
    yield history.push("/");
  } catch ( error ) {
    toast.error( 'Error processing your payment' );
    yield put( stripeChargeFailure( error ) );
  }
}

export function* watchStripeCharge () {
  yield takeLatest( STRIPE_CHARGE, stripeChargeSaga );
}
