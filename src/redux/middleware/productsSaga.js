import {call, put, takeLatest} from 'redux-saga/effects';
import toast from 'toastr';
import {
	GET_ALL_PRODUCTS,
	FILTER_ALL_DEPARTMENTS,
	FILTER_ALL_CATEGORIES,
	SEARCH_ALL_PRODUCTS
} from '../constants/actionTypes'
import ProductsAPI from '../../services/products';
import {
	getProductsSuccess,
	getProductsFailure,
	filterAllDepartmentsFailure,
	filterAllDepartmentsSuccess,
	filterAllCategoriesFailure,
	filterAllCategoriesSuccess,
	searchAllProductsFailure,
	searchAllProductsSuccess,
} from '../actionCreator/products';

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

export function* filterAllDepartmentsSaga ( action ) {
	try {
		const {deptId, query} = action;
		const response = yield call( ProductsAPI.filterAllDepartments, {deptId, query} );
		toast.success( "Successfully filtered products by Departments" );
		yield put( filterAllDepartmentsSuccess( response.data ) );
	} catch ( error ) {
		toast.error('Failed to filter products by Departments');
		yield put( filterAllDepartmentsFailure( error ) );
	}
}

export function* watchFilterAllDepartments () {
	yield takeLatest( FILTER_ALL_DEPARTMENTS, filterAllDepartmentsSaga );
}

export function* filterAllCategoriesSaga ( action ) {
	try {
		const {CategoryId, query} = action;
		const response = yield call( ProductsAPI.filterAllCategories, {CategoryId, query} );
		toast.success( "Successfully filtered products by Categories" );
		yield put( filterAllCategoriesSuccess( response.data ) );
	} catch ( error ) {
		toast.error('Failed to filter products by Categories');
		yield put( filterAllCategoriesFailure( error ) );
	}
}

export function* watchFilterAllCategories () {
	yield takeLatest( FILTER_ALL_CATEGORIES, filterAllCategoriesSaga );
}

export function* searchAllProductsSaga ( action ) {
	try {
		const {queryString, pageDetails} = action;
		const response = yield call( ProductsAPI.searchAllProducts, {queryString, pageDetails} );
		toast.success( `Successfully searched for products matching ${queryString}` );
		yield put( searchAllProductsSuccess( response.data ) );
	} catch ( error ) {
		toast.error( 'Failed to complete search' );
		yield put( searchAllProductsFailure( error ) );
	}
}

export function* watchSearchAllProducts () {
	yield takeLatest( SEARCH_ALL_PRODUCTS, searchAllProductsSaga );
}
