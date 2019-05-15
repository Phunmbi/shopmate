import {call, put, takeLatest} from 'redux-saga/effects';
import toast from 'toastr';
import CheckoutAPI from '../../services/checkout';
import {GET_SHIPPING_COSTS, GET_SHIPPING_REGIONS} from "../constants/actionTypes";
import {
  getShippingCostFailure,
  getShippingCostSuccess,
  getShippingRegionsFailure,
  getShippingRegionsSuccess
} from "../actionCreator/checkout";

export function* getShippingRegionsSaga (  ) {
  try {
    const response = yield call( CheckoutAPI.getShippingRegions );
    
    yield put( getShippingRegionsSuccess( response.data ) );
  } catch ( error ) {
    toast.error('Error signing up user');
    yield put( getShippingRegionsFailure( error ) );
  }
}

export function* watchGetShippingRegions () {
  yield takeLatest( GET_SHIPPING_REGIONS, getShippingRegionsSaga );
}

export function* getShippingCostSaga ( action ) {
  try {
    const {shippingId} = action;
    const response = yield call( CheckoutAPI.getShippingCost, { shippingId} );
    
    yield put( getShippingCostSuccess( response.data ) );
  } catch ( error ) {
    toast.error( 'Error signing in user' );
    yield put( getShippingCostFailure( error ) );
  }
}

export function* watchGetShippingCost () {
  yield takeLatest( GET_SHIPPING_COSTS, getShippingCostSaga );
}
