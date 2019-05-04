import {
	GET_ALL_PRODUCTS,
	GET_ALL_PRODUCTS_FAILURE,
	GET_ALL_PRODUCTS_SUCCESS,
	FILTER_ALL_DEPARTMENTS,
	FILTER_ALL_DEPARTMENTS_SUCCESS,
	FILTER_ALL_DEPARTMENTS_FAILURE,
	FILTER_ALL_CATEGORIES,
	FILTER_ALL_CATEGORIES_FAILURE,
	FILTER_ALL_CATEGORIES_SUCCESS,
	SEARCH_ALL_PRODUCTS,
	SEARCH_ALL_PRODUCTS_SUCCESS,
	SEARCH_ALL_PRODUCTS_FAILURE,
	SINGLE_PRODUCT_DETAILS,
	SINGLE_PRODUCT_DETAILS_SUCCESS,
	SINGLE_PRODUCT_DETAILS_FAILURE,
	SINGLE_PRODUCT_REVIEWS,
	SINGLE_PRODUCT_REVIEWS_SUCCESS,
	SINGLE_PRODUCT_REVIEWS_FAILURE,
	ADD_SINGLE_REVIEW,
	ADD_SINGLE_REVIEW_SUCCESS,
	ADD_SINGLE_REVIEW_FAILURE
} from '../constants/actionTypes';

export const getProducts = ( page, limit ) => {
	return {
		type: GET_ALL_PRODUCTS,
		page,
		limit
	};
};

export const getProductsSuccess = data => {
	return {
		type: GET_ALL_PRODUCTS_SUCCESS,
		payload: data,
	};
};

export const getProductsFailure = error => {
	return {
		type: GET_ALL_PRODUCTS_FAILURE,
		payload: error,
	};
};

export const filterAllDepartments = ( deptId, query ) => {
	return {
		type: FILTER_ALL_DEPARTMENTS,
		deptId,
		query
	};
};

export const filterAllDepartmentsSuccess = data => {
	return {
		type: FILTER_ALL_DEPARTMENTS_SUCCESS,
		payload: data,
	};
};

export const filterAllDepartmentsFailure = error => {
	return {
		type: FILTER_ALL_DEPARTMENTS_FAILURE,
		payload: error,
	};
};

export const filterAllCategories = ( CategoryId, query ) => {
	return {
		type: FILTER_ALL_CATEGORIES,
		CategoryId,
		query,
	};
};

export const filterAllCategoriesSuccess = data => {
	return {
		type: FILTER_ALL_CATEGORIES_SUCCESS,
		payload: data,
	};
};

export const filterAllCategoriesFailure = error => {
	return {
		type: FILTER_ALL_CATEGORIES_FAILURE,
		payload: error,
	};
};

export const searchAllProducts = ( queryString, pageDetails ) => {
	return {
		type: SEARCH_ALL_PRODUCTS,
		queryString,
		pageDetails,
	};
};

export const searchAllProductsSuccess = data => {
	return {
		type: SEARCH_ALL_PRODUCTS_SUCCESS,
		payload: data,
	};
};

export const searchAllProductsFailure = error => {
	return {
		type: SEARCH_ALL_PRODUCTS_FAILURE,
		payload: error,
	};
};

export const singleProductDetails = ( productId ) => {
	return {
		type: SINGLE_PRODUCT_DETAILS,
		productId,
	};
};

export const singleProductDetailsSuccess = data => {
	return {
		type: SINGLE_PRODUCT_DETAILS_SUCCESS,
		payload: data,
	};
};

export const singleProductDetailsFailure = error => {
	return {
		type: SINGLE_PRODUCT_DETAILS_FAILURE,
		payload: error,
	};
};

export const singleProductReviews = ( productId ) => {
  return {
    type: SINGLE_PRODUCT_REVIEWS,
    productId,
  };
};

export const singleProductReviewsSuccess = data => {
  return {
    type: SINGLE_PRODUCT_REVIEWS_SUCCESS,
    payload: data,
  };
};

export const singleProductReviewsFailure = error => {
  return {
    type: SINGLE_PRODUCT_REVIEWS_FAILURE,
    payload: error,
  };
};


export const addSingleReview = ( product_id, review, rating, callback ) => {
	return {
		type: ADD_SINGLE_REVIEW,
		product_id,
		review,
		rating,
		callback
	};
};

export const addSingleReviewSuccess = data => {
	return {
		type: ADD_SINGLE_REVIEW_SUCCESS,
		payload: data,
	};
};

export const addSingleReviewFailure = error => {
	return {
		type: ADD_SINGLE_REVIEW_FAILURE,
		payload: error,
	};
};
