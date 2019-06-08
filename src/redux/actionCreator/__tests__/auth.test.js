import * as actionTypes from '../../constants/actionTypes';
import * as authActions from '../auth';

const res = {
  isAuthenticated: true,
  user: {
    id: 1,
    firstName: 'tomato',
    lastName: 'Egg',
    image: 'http://www.imageurl.com/gif'
  },
  error: false
};

const error = '';

describe('Test for auth action', () => {
  it('create an action SIGN_UP to set user in store', (done) => {
    expect(authActions.signUp().type).
    toEqual(actionTypes.SIGN_UP);
    done();
  });

  it('create an action to SIGN_UP_SUCCESS to redux store', (done) => {
    expect(authActions.signUpSuccess(res).type).
    toEqual(actionTypes.SIGN_UP_SUCCESS);
    done();
  });

  it('create an action to SIGN_UP_FAILURE to redux store', (done) => {
    expect(authActions.signUpFailure(error).type).
    toEqual(actionTypes.SIGN_UP_FAILURE);
    done();
  });
  it('create an action SIGN_IN to set user in store', (done) => {
    expect(authActions.signIn().type).
    toEqual(actionTypes.SIGN_IN);
    done();
  });

  it('create an action to SIGN_IN_SUCCESS to redux store', (done) => {
    expect(authActions.signInSuccess(res).type).
    toEqual(actionTypes.SIGN_IN_SUCCESS);
    done();
  });

  it('create an action to SIGN_IN_FAILURE to redux store', (done) => {
    expect(authActions.signInFailure(error).type).
    toEqual(actionTypes.SIGN_IN_FAILURE);
    done();
  });
  it('create an action GET_USER to set user in store', (done) => {
    expect(authActions.getUser().type).
    toEqual(actionTypes.GET_USER);
    done();
  });

  it('create an action to GET_USER_SUCCESS to redux store', (done) => {
    expect(authActions.getUserSuccess(res).type).
    toEqual(actionTypes.GET_USER_SUCCESS);
    done();
  });

  it('create an action to GET_USER_FAILURE to redux store', (done) => {
    expect(authActions.getUserFailure(error).type).
    toEqual(actionTypes.GET_USER_FAILURE);
    done();
  });
});
