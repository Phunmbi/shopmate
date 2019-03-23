import {call, put, takeLatest} from 'redux-saga/effects';
import {GET_ALL_PRODUCTS} from '../constants/actionTypes'
import ProductsAPI from '../../services/products';
import {getProductsSuccess, getProductsFailure} from '../actionCreator/products';

export function* getProductsSaga(action) {
	try {
		const {page, limit} = action;
		const response = yield call( ProductsAPI.getProducts, {page, limit} );
		yield put(getProductsSuccess(response.data));
	} catch (error) {
		yield put(getProductsFailure(error));
	}
}

export function* watchGetProducts() {
	yield takeLatest(GET_ALL_PRODUCTS, getProductsSaga);
}