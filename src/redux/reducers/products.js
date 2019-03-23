import * as types from '../constants/actionTypes';

const initialState = {
	products: [],
	count: null,
	error: '',
	loading: false,
};

const auth = ( state = initialState, action ) => {
	switch (action.type) {
		case types.GET_ALL_PRODUCTS:
			return {
				...state,
				loading: true,
				count: null,
				error: '',
			};
		case types.GET_ALL_PRODUCTS_SUCCESS:
			return {
				...state,
				loading: false,
				count: action.payload.count,
				products: [...action.payload.rows],
				error: '',
			};
		case types.GET_ALL_PRODUCTS_FAILURE:
			return {
				...state,
				count: null,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default auth;
