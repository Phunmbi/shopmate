import * as types from '../constants/actionTypes';

const initialState = {
	isAuthenticated: false,
	user: {},
  error: false,
  loading: false
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case types.SIGN_UP:
		case types.SIGN_IN:
		case types.GET_USER:
    case types.UPDATE_USER:
			return {
        ...state,
        loading: true,
				error: false,
			};
		case types.SIGN_UP_SUCCESS:
		case types.SIGN_IN_SUCCESS:
			return {
        ...state,
        loading: false,
				user: {...action.payload.customer},
				isAuthenticated: true,
				error: false,
			};
    case types.UPDATE_USER_SUCCESS:
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {...action.payload},
        error: false,
      };
		case types.SIGN_UP_FAILURE:
		case types.SIGN_IN_FAILURE:
		case types.GET_USER_FAILURE:
    case types.UPDATE_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};

export default auth;
