import auth from '../auth';
import {SIGN_UP, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from '../../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: false,
  loading: false
};

describe('Auth Reducer', () => {
  it('returns initial state with unknown actions', () => {
    const unknownAction = {
      type: 'UNKNOWN TYPE'
    };
    expect(auth(initialState, unknownAction)).toEqual(initialState);
  });

  it('updates the error with sign up failure', () => {
    const errorAction = {
      type: SIGN_UP_FAILURE,
      error: true
    };
    expect(auth(initialState, errorAction).error)
      .toBe(errorAction.error);
  });

  it('updates to loading during sign up', () => {
    const action = {
      type: SIGN_UP,
      loading: true
    };
    expect(auth(initialState, action).loading).toBe(true);
  });

  it('returns sign up correctly', () => {
    const action = {
      type: SIGN_UP_SUCCESS,
      payload: {
        customer: {
          fullName: "Names",
          id: 798
        }
      },
      isAuthenticated: true,
      loading: false
    };
    expect(auth(initialState, action).isAuthenticated).toBe(true);
  });
});
