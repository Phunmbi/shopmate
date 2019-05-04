import {call, put, takeLatest} from 'redux-saga/effects';
import toast from 'toastr';
import {
	GET_ALL_PRODUCTS,
	FILTER_ALL_DEPARTMENTS,
	FILTER_ALL_CATEGORIES,
	SEARCH_ALL_PRODUCTS,
	SINGLE_PRODUCT_DETAILS,
	SINGLE_PRODUCT_REVIEWS, ADD_SINGLE_REVIEW
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
	singleProductDetailsFailure,
	singleProductDetailsSuccess,
	singleProductReviewsFailure,
	singleProductReviewsSuccess, addSingleReviewFailure, addSingleReviewSuccess
} from '../actionCreator/products';
import {addToCartSuccess} from "../actionCreator/shoppingCart";

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

export function* singleProductDetailsSaga ( action ) {
    try {
        const {productId} = action;
        const response = yield call( ProductsAPI.singleProductDetails, {productId} );
        yield put( singleProductDetailsSuccess( response.data ) );
    } catch ( error ) {
        toast.error( 'Failed to load details for product' );
        yield put( singleProductDetailsFailure( error ) );
    }
}

export function* watchSingleProductDetails () {
    yield takeLatest( SINGLE_PRODUCT_DETAILS, singleProductDetailsSaga );
}

export function* singleProductReviewsSaga ( action ) {
  try {
    const {productId} = action;
    const response = yield call( ProductsAPI.singleProductReviews, {productId} );
    yield put( singleProductReviewsSuccess( response.data ) );
  } catch ( error ) {
    toast.error( 'Failed to load reviews for product' );
    yield put( singleProductReviewsFailure( error ) );
  }
}

export function* watchSingleProductReviews () {
  yield takeLatest( SINGLE_PRODUCT_REVIEWS, singleProductReviewsSaga );
}

export function* addSingleReviewSaga ( action ) {
	try {
		const {product_id, review, rating, callback} = action;
		yield call( ProductsAPI.addSingleReview, {product_id, review, rating} );
		toast.success( 'Successfully added new review for product' );
		callback()
	} catch ( error ) {
		toast.error( 'Failed to add reviews for product' );
		yield put( addSingleReviewFailure( error ) );
	}
}

export function* watchAddReview () {
	yield takeLatest( ADD_SINGLE_REVIEW, addSingleReviewSaga );
}
