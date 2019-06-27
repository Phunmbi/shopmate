import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import toast from 'toastr';
import AuthAPI from '../../../services/auth';
import { watchGetUser, watchSignIn, watchSignUp, watchUpdateUser } from '../authSaga';

const error = new Error('Possible network error, please reload the page');

const response = {
  data: {
    accessToken: 'token1245',
    success: true,
    message: 'successfully signed new user up',
    customer: {
      name: 'Adeniyi'
    }
  }
};

const action = {
  query: {
    Name: 'Adeniyi',
    Email: 'test@shopmate.com',
    Password: 'doneTest3241'
  },
};

const {query, address_1, address_2, city, region, country, postal_code, shipping_region_id} = action;
const history = jest.fn();
const callback = jest.fn();
const { Name, Email, Password } = query;

toast.error = jest.fn();
toast.success = jest.fn();

describe('Auth Saga', () => {
  describe('Sign up saga', () => {
    it('signs user up', () => {
      return expectSaga(watchSignUp, AuthAPI)
        .provide([[call(AuthAPI.signup, { Name, Email, Password }), response]])
        .put({
          type: 'SIGN_UP_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'SIGN_UP',
          query,
          callback
        })
        .silentRun();
    });

    it('throws error if there is an error signing user up', () => {
      return expectSaga(watchSignUp, AuthAPI)
        .provide([[matchers.call.fn(AuthAPI.signup), throwError(error)]])
        .put({
          type: 'SIGN_UP_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'SIGN_UP',
          query,
          callback
        })
        .silentRun();
    });
  });

  describe('Sign in', () => {
    it('signs user in', () => {
      return expectSaga(watchSignIn, AuthAPI)
        .provide([[call(AuthAPI.signin, { Email, Password }), response]])
        .put({
          type: 'SIGN_IN_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'SIGN_IN',
          query,
          callback
        })
        .silentRun();
    });

    it('throws error if there is an error signing user in', () => {
      return expectSaga(watchSignIn, AuthAPI)
        .provide([[matchers.call.fn(AuthAPI.signin), throwError(error)]])
        .put({
          type: 'SIGN_IN_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'SIGN_IN',
          query,
          callback
        })
        .silentRun();
    });
  });

  describe('Get User saga', () => {
    it('gets user information', () => {
      return expectSaga(watchGetUser, AuthAPI)
        .provide([[call(AuthAPI.getUser ), response]])
        .put({
          type: 'GET_USER_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'GET_USER',
        })
        .silentRun();
    });

    it('throws error if there is an error getting user information', () => {
      return expectSaga(watchGetUser, AuthAPI)
        .provide([[matchers.call.fn(AuthAPI.getUser), throwError(error)]])
        .put({
          type: 'GET_USER_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'GET_USER',
        })
        .silentRun();
    });
  });

  describe('Update User saga', () => {
    it('updates user information', () => {
      return expectSaga(watchUpdateUser, AuthAPI)
        .provide([[call(AuthAPI.updateUser, {address_1, address_2, city, region, country, postal_code, shipping_region_id}), response]])
        .put({
          type: 'UPDATE_USER_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'UPDATE_USER', address_1, address_2, city, region, country, postal_code, shipping_region_id, history
        })
        .silentRun();
    });

    it('throws error if there is an error updating user information', () => {
      return expectSaga(watchUpdateUser, AuthAPI)
        .provide([[matchers.call.fn(AuthAPI.updateUser), throwError(error)]])
        .put({
          type: 'UPDATE_USER_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'UPDATE_USER', address_1, address_2, city, region, country, postal_code, shipping_region_id, history
        })
        .silentRun();
    });
  });
});
