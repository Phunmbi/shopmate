import auth from '../auth';
import {
  GET_USER_SUCCESS,
  SIGN_UP,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  UPDATE_USER_SUCCESS
} from '../../constants/actionTypes';

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

  it('returns get user correctly', () => {
    const action = {
      type: GET_USER_SUCCESS,
      payload: {
        fullName: "Names",
        id: 798,
        address_1: 'no 1 aminu',
        address_2: '',
        city: 'Lagos',
        Region: 'South West',
        Country: 'Nigeria'
      },
      loading: false
    };
    expect(auth(initialState, action).user.Country).toBe('Nigeria');
  });

  it('returns update user correctly', () => {
    const action = {
      type: UPDATE_USER_SUCCESS,
      payload: {
        fullName: "Names",
        id: 798,
        address_1: 'no 1 aminu',
        address_2: '',
        City: 'Lagos',
        Region: 'South West',
        Country: 'Nigeria'
      },
      loading: false
    };
    expect(auth(initialState, action).user.City).toBe('Lagos');
  });
});
