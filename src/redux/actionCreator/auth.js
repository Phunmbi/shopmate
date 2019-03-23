import {
  SIGN_UP,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS
} from '../constants/actionTypes';

export const signUp = query => {
	return {
		type: SIGN_UP,
		query,
	};
};

export const signUpSuccess = data => {
	return {
		type: SIGN_UP_SUCCESS,
		payload: data,
	};
};

export const signUpFailure = error => {
	return {
		type: SIGN_UP_FAILURE,
		payload: error,
	};
};
