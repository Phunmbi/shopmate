import {
  SIGN_UP,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
	SIGN_IN,
	SIGN_IN_SUCCESS,
	SIGN_IN_FAILURE
} from '../constants/actionTypes';

export const signUp = (query, callback) => {
	return {
		type: SIGN_UP,
		query,
		callback
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

export const signIn = ( query, callback ) => {
	return {
		type: SIGN_IN,
		query,
		callback
	};
};

export const signInSuccess = data => {
	return {
		type: SIGN_IN_SUCCESS,
		payload: data,
	};
};

export const signInFailure = error => {
	return {
		type: SIGN_IN_FAILURE,
		payload: error,
	};
};
