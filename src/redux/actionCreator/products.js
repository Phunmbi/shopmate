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
	SEARCH_ALL_PRODUCTS_FAILURE
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