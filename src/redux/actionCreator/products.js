import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_SUCCESS
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
