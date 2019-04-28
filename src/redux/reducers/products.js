import * as types from '../constants/actionTypes';

const initialState = {
	products: [],
	singleProductDetails: {},
	count: null,
	error: '',
	loading: false,
	reviews: [],
	reviewsError: '',
	reviewsLoading: false
};

const product = ( state = initialState, action ) => {
	switch (action.type) {
		case types.GET_ALL_PRODUCTS:
		case types.FILTER_ALL_DEPARTMENTS:
		case types.FILTER_ALL_CATEGORIES:
		case types.SEARCH_ALL_PRODUCTS:
			return {
				...state,
				loading: true,
				count: null,
				error: '',
			};
		case types.FILTER_ALL_DEPARTMENTS_SUCCESS:
		case types.SEARCH_ALL_PRODUCTS_SUCCESS:
		case types.FILTER_ALL_CATEGORIES_SUCCESS:
		case types.GET_ALL_PRODUCTS_SUCCESS:
			return {
				...state,
				loading: false,
				count: action.payload.count,
				products: [ ...action.payload.rows ],
				error: '',
			};
		case types.FILTER_ALL_DEPARTMENTS_FAILURE:
		case types.FILTER_ALL_CATEGORIES_FAILURE:
		case types.GET_ALL_PRODUCTS_FAILURE:
		case types.SEARCH_ALL_PRODUCTS_FAILURE:
			return {
				...state,
				count: null,
				loading: false,
				error: action.payload,
			};
		case types.SINGLE_PRODUCT_DETAILS:
			return {
				...state,
				loading: true,
				error: '',
			};
		case types.SINGLE_PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				singleProductDetails: {...action.payload},
				error: '',
			};
		case types.SINGLE_PRODUCT_DETAILS_FAILURE:
			return {
				...state,
				singleProductDetails: {},
				loading: false,
				error: action.payload,
			};
    case types.SINGLE_PRODUCT_REVIEWS:
      return {
        ...state,
        reviewsLoading: true,
        reviewsError: '',
				reviews: []
      };
    case types.SINGLE_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewsLoading: false,
        reviews: [...action.payload],
        reviewsError: '',
      };
    case types.SINGLE_PRODUCT_REVIEWS_FAILURE:
      return {
        ...state,
        reviews: [],
        reviewsLoading: false,
        reviewsError: action.payload,
      };
		default:
			return state;
	}
};

export default product;
