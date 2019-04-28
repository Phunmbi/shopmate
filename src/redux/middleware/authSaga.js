import {call, put, takeLatest} from 'redux-saga/effects';
import toast from 'toastr';
import {SIGN_UP, SIGN_IN, GET_USER} from '../constants/actionTypes'
import AuthAPI from '../../services/auth';
import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  getUserSuccess, getUserFailure
} from '../actionCreator/auth';

export function* signUpSaga ( action ) {
  try {
    const {query: {Name, Email, Password}, callback} = action;
    const response = yield call( AuthAPI.signup, {Name, Email, Password} );

    // Persist user details
    localStorage.setItem( "accessToken", response.data.accessToken );
    localStorage.setItem( "isAuthenticated", true );
    localStorage.setItem( "name", response.data.customer.name );

    yield put( signUpSuccess( response.data ) );

    toast.success( "Successfully created user" );

    // Close the modal
    yield callback();
  } catch ( error ) {
    toast.error('Error signing up user');
    yield put( signUpFailure( error ) );
  }
}

export function* watchSignUp () {
  yield takeLatest( SIGN_UP, signUpSaga );
}

export function* signInSaga ( action ) {
  try {
    const {query: {Email, Password}, callback} = action;
    const response = yield call( AuthAPI.signin, {Email, Password} );

    console.log( response );
    // Persist user details
    localStorage.setItem( "accessToken", response.data.accessToken );
    localStorage.setItem( "isAuthenticated", 'true' );
    localStorage.setItem( "name", response.data.customer.name );

    yield put( signInSuccess( response.data ) );

    yield toast.success( "Successfully signed in" );

    // Close the modal
    yield callback();
  } catch ( error ) {
    toast.error( 'Error signing in user' );
    yield put( signInFailure( error ) );
  }
}

export function* watchSignIn () {
  yield takeLatest( SIGN_IN, signInSaga );
}

export function* getUserSaga ( ) {
  try {
    const response = yield call( AuthAPI.getUser );
    
    console.log( response );
    // Confirm user authorization status
    localStorage.setItem( "isAuthenticated", 'true' );
    
    yield put( getUserSuccess( response.data ) );
  } catch ( error ) {
    localStorage.removeItem( "accessToken" );
    yield put( getUserFailure( error ) );
  }
}

export function* watchGetUser () {
  yield takeLatest( GET_USER, getUserSaga );
}
