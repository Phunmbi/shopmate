import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import toast from 'toastr';
import ProductsAPI from '../../../services/products';
import {
  watchAddReview, watchFilterAllCategories, watchFilterAllDepartments, watchGetProducts, watchSearchAllProducts,
  watchSingleProductDetails, watchSingleProductReviews
} from '../productsSaga';

const error = new Error('Possible network error, please reload the page');

const response = {
  data: {}
};

const action = {
  page: 1,
  limit: 10,
  query: 'string',
  deptId: 3,
  CategoryId: 6,
  queryString: 'search string',
  pageDetails: {
    page: 4,
    limit: 15
  },
  productId: 32,
  product_id: 2,
  review: 'seems like a good enough product',
  rating: 4,
  callback: jest.fn()
};

const {
  page, limit, deptId, query, CategoryId, queryString, pageDetails, productId, product_id, rating, review, callback
} = action;

toast.error = jest.fn();
toast.success = jest.fn();

describe('Products Saga', () => {
  describe('Get Products Saga', () => {
    it('fetches products', () => {
      return expectSaga(watchGetProducts, ProductsAPI)
        .provide([[call(ProductsAPI.getProducts, { page, limit }), response]])
        .put({
          type: 'GET_ALL_PRODUCTS_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'GET_ALL_PRODUCTS', page, limit
        })
        .silentRun();
    });

    it('throws error if there is an error fetching products', () => {
      return expectSaga(watchGetProducts, ProductsAPI)
        .provide([[matchers.call.fn(ProductsAPI.getProducts), throwError(error)]])
        .put({
          type: 'GET_ALL_PRODUCTS_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'GET_ALL_PRODUCTS', page, limit
        })
        .silentRun();
    });
  });

  describe('Filter all departments Saga', () => {
    it("filters departments", () => {
      return expectSaga(watchFilterAllDepartments, ProductsAPI)
        .provide([[call(ProductsAPI.filterAllDepartments, { deptId, query }), response]])
        .put({
          type: 'FILTER_ALL_DEPARTMENTS_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'FILTER_ALL_DEPARTMENTS', deptId, query
        })
        .silentRun();
    });

    it('throws error if there is an error filtering products', () => {
      return expectSaga(watchFilterAllDepartments, ProductsAPI)
        .provide([[matchers.call.fn(ProductsAPI.filterAllDepartments), throwError(error)]])
        .put({
          type: 'FILTER_ALL_DEPARTMENTS_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'FILTER_ALL_DEPARTMENTS', deptId, query
        })
        .silentRun();
    });
  });

  describe('Filter all categories Saga', () => {
    it('filters by categories', () => {
      return expectSaga(watchFilterAllCategories, ProductsAPI)
        .provide([[call(ProductsAPI.filterAllCategories, { CategoryId, query } ), response]])
        .put({
          type: 'FILTER_ALL_CATEGORIES_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'FILTER_ALL_CATEGORIES', CategoryId, query
        })
        .silentRun();
    });

    it('throws error if there is an error filtering by categories', () => {
      return expectSaga(watchFilterAllCategories, ProductsAPI)
        .provide([[matchers.call.fn(ProductsAPI.filterAllCategories), throwError(error)]])
        .put({
          type: 'FILTER_ALL_CATEGORIES_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'FILTER_ALL_CATEGORIES', CategoryId, query
        })
        .silentRun();
    });
  });

  describe('Search Products Saga', () => {
    it('searches products', () => {
      return expectSaga(watchSearchAllProducts, ProductsAPI)
        .provide([[call(ProductsAPI.searchAllProducts, { queryString, pageDetails }), response]])
        .put({
          type: 'SEARCH_ALL_PRODUCTS_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'SEARCH_ALL_PRODUCTS', queryString, pageDetails
        })
        .silentRun();
    });

    it('throws error if there is an error searching for products', () => {
      return expectSaga(watchSearchAllProducts, ProductsAPI)
        .provide([[matchers.call.fn(ProductsAPI.searchAllProducts), throwError(error)]])
        .put({
          type: 'SEARCH_ALL_PRODUCTS_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'SEARCH_ALL_PRODUCTS', queryString, pageDetails
        })
        .silentRun();
    });
  });

  describe('Single Product Details Saga', () => {
    it('fetches single product details', () => {
      return expectSaga(watchSingleProductDetails, ProductsAPI)
        .provide([[call(ProductsAPI.singleProductDetails, { productId }), response]])
        .put({
          type: 'SINGLE_PRODUCT_DETAILS_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'SINGLE_PRODUCT_DETAILS', productId
        })
        .silentRun();
    });

    it('throws error if there is an error fetching single product details', () => {
      return expectSaga(watchSingleProductDetails, ProductsAPI)
        .provide([[matchers.call.fn(ProductsAPI.singleProductDetails), throwError(error)]])
        .put({
          type: 'SINGLE_PRODUCT_DETAILS_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'SINGLE_PRODUCT_DETAILS', productId
        })
        .silentRun();
    });
  });

  describe('Single Product Review Saga', () => {
    it('fetches single product reviews', () => {
      return expectSaga(watchSingleProductReviews, ProductsAPI)
        .provide([[call(ProductsAPI.singleProductReviews, { productId }), response]])
        .put({
          type: 'SINGLE_PRODUCT_REVIEWS_SUCCESS',
          payload: response.data
        })
        .dispatch({
          type: 'SINGLE_PRODUCT_REVIEWS', productId
        })
        .silentRun();
    });

    it('throws error if there is an error fetching single product reviews', () => {
      return expectSaga(watchSingleProductReviews, ProductsAPI)
        .provide([[matchers.call.fn(ProductsAPI.singleProductReviews), throwError(error)]])
        .put({
          type: 'SINGLE_PRODUCT_REVIEWS_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'SINGLE_PRODUCT_REVIEWS', productId
        })
        .silentRun();
    });
  });

  describe('Add Product Reviews Saga', () => {
    it('adds product reviews', () => {
      return expectSaga(watchAddReview, ProductsAPI)
        .provide([[call(ProductsAPI.addSingleReview, { product_id, review, rating }), response]])
        .dispatch({
          type: 'ADD_SINGLE_REVIEW', product_id, review, rating, callback
        })
        .silentRun();
    });

    it('throws error if there is an error adding a product review', () => {
      return expectSaga(watchAddReview, ProductsAPI)
        .provide([[matchers.call.fn(ProductsAPI.addSingleReview), throwError(error)]])
        .put({
          type: 'ADD_SINGLE_REVIEW_FAILURE',
          payload: error
        })
        .dispatch({
          type: 'ADD_SINGLE_REVIEW', product_id, review, rating, callback
        })
        .silentRun();
    });
  });
});
