import products from '../products';
import {
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_SUCCESS,
  FILTER_ALL_CATEGORIES_FAILURE,
  FILTER_ALL_CATEGORIES,
  FILTER_ALL_CATEGORIES_SUCCESS,
  FILTER_ALL_DEPARTMENTS_FAILURE,
  FILTER_ALL_DEPARTMENTS,
  FILTER_ALL_DEPARTMENTS_SUCCESS,
  SEARCH_ALL_PRODUCTS_SUCCESS,
  SINGLE_PRODUCT_DETAILS_FAILURE,
  SINGLE_PRODUCT_DETAILS,
  SINGLE_PRODUCT_DETAILS_SUCCESS,
  SINGLE_PRODUCT_REVIEWS_FAILURE,
  SINGLE_PRODUCT_REVIEWS,
  SINGLE_PRODUCT_REVIEWS_SUCCESS,
  ADD_SINGLE_REVIEW,
  ADD_SINGLE_REVIEW_SUCCESS,
  ADD_SINGLE_REVIEW_FAILURE
} from "../../constants/actionTypes";

const initialState = {
  products: [],
  singleProductDetails: {},
  singleProductLoading: true,
  count: null,
  error: '',
  loading: false,
  reviews: [],
  reviewsError: '',
  reviewsLoading: false
};

describe('Products Reducer', () => {
  it('returns initial state with unknown actions', () => {
    const unknownAction = {
      type: 'UNKNOWN TYPE'
    };
    expect(products(initialState, unknownAction)).toEqual(initialState);
  });

  it('updates the error with get all products failure', () => {
    const errorAction = {
      type: GET_ALL_PRODUCTS_FAILURE,
      payload: true,
      loading: false
    };
    expect(products(initialState, errorAction).error)
      .toBe(true);
  });

  it('updates to loading while getting all products', () => {
    const action = {
      type: GET_ALL_PRODUCTS,
      loading: true
    };
    expect(products(initialState, action).loading).toBe(true);
  });

  it('returns get all products correctly', () => {
    const action = {
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: {
        rows: ['rows rows'],
        count: 1
      },
      loading: false
    };
    expect(products(initialState, action).products).toEqual(['rows rows']);
  });

  it('updates the error with filter Categories failure', () => {
    const errorAction = {
      type: FILTER_ALL_CATEGORIES_FAILURE,
      payload: true,
      loading: false
    };
    expect(products(initialState, errorAction).error)
      .toBe(true);
  });

  it('updates to loading while filtering categories', () => {
    const action = {
      type: FILTER_ALL_CATEGORIES,
      loading: true
    };
    expect(products(initialState, action).loading).toBe(true);
  });

  it('returns get filter categories correctly', () => {
    const action = {
      type: FILTER_ALL_CATEGORIES_SUCCESS,
      payload: {
        rows: ['rows rows'],
        count: 1
      },
      loading: false
    };
    expect(products(initialState, action).products).toEqual(['rows rows']);
  });

  it('updates the error with filter departments failure', () => {
    const errorAction = {
      type: FILTER_ALL_DEPARTMENTS_FAILURE,
      payload: true,
      loading: false
    };
    expect(products(initialState, errorAction).error)
      .toBe(true);
  });

  it('updates to loading while filtering departments', () => {
    const action = {
      type: FILTER_ALL_DEPARTMENTS,
      loading: true
    };
    expect(products(initialState, action).loading).toBe(true);
  });

  it('returns get filter departments correctly', () => {
    const action = {
      type: FILTER_ALL_DEPARTMENTS_SUCCESS,
      payload: {
        rows: ['rows rows'],
        count: 1
      },
      loading: false
    };
    expect(products(initialState, action).products).toEqual(['rows rows']);
  });

  it('returns search all products correctly', () => {
    const action = {
      type: SEARCH_ALL_PRODUCTS_SUCCESS,
      payload: {
        rows: ['rows rows'],
        count: 1
      },
      loading: false
    };
    expect(products(initialState, action).products).toEqual(['rows rows']);
  });

  it('updates the error with single product details failure', () => {
    const errorAction = {
      type: SINGLE_PRODUCT_DETAILS_FAILURE,
      payload: true,
      singleProductLoading: false
    };
    expect(products(initialState, errorAction).error)
      .toBe(true);
  });

  it('updates to loading while getting single product details', () => {
    const action = {
      type: SINGLE_PRODUCT_DETAILS,
      singleProductLoading: true,
    };
    expect(products(initialState, action).singleProductLoading).toBe(true);
  });

  it('returns single product details correctly', () => {
    const action = {
      type: SINGLE_PRODUCT_DETAILS_SUCCESS,
      payload: {
        product: 4
      },
      singleProductLoading: false
    };
    expect(products(initialState, action).singleProductDetails).toEqual({product: 4});
  });

  it('updates the error with single product reviews failure', () => {
    const errorAction = {
      type: SINGLE_PRODUCT_REVIEWS_FAILURE,
      payload: true,
      reviewsLoading: false
    };
    expect(products(initialState, errorAction).reviewsError)
      .toBe(true);
  });

  it('updates to loading while getting single product reviews', () => {
    const action = {
      type: SINGLE_PRODUCT_REVIEWS,
      reviewsLoading: true
    };
    expect(products(initialState, action).reviewsLoading).toBe(true);
  });

  it('returns single product reviews correctly', () => {
    const action = {
      type: SINGLE_PRODUCT_REVIEWS_SUCCESS,
      payload: ['correctly'],
      reviewsLoading: false
    };
    expect(products(initialState, action).reviews).toEqual(['correctly']);
  });

  it('updates the error with add single error failure', () => {
    const errorAction = {
      type: ADD_SINGLE_REVIEW_FAILURE,
      payload: true,
      creatingStripeCharge: false
    };
    expect(products(initialState, errorAction).reviewsError)
      .toBe(true);
  });

  it('updates to loading while adding single review', () => {
    const action = {
      type: ADD_SINGLE_REVIEW,
      reviewsLoading: true
    };
    expect(products(initialState, action).reviewsLoading).toBe(true);
  });

  it('returns creates add single review correctly', () => {
    const state = {
      reviews: 'reviews'
    };

    const action = {
      type: ADD_SINGLE_REVIEW_SUCCESS,
      payload: 'correctly',
      loadingCost: false
    };
    expect(products(state, action).reviews).toEqual('reviews');
  });
});
