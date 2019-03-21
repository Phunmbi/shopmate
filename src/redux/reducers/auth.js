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
			return {
        ...state,
        loading: true,
				error: false,
			};
		case types.SIGN_UP_SUCCESS:
			return {
        ...state,
        loading: false,
        user: {...action},
				error: false,
			};
		case types.SIGN_UP_FAILURE:
			return {
        ...state,
        loading: false,
				error: true,
			};
		default:
			return state;
	}
};

export default auth;
