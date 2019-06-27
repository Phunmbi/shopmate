import * as actionTypes from '../../constants/actionTypes';
import * as productActions from '../products';

const res = {
  data:{},
  error: false
};

const error = '';

describe('Test for products actions', () => {
  it('create an action GET_ALL_PRODUCTS to set user in store', (done) => {
    expect(productActions.getProducts().type).
    toEqual(actionTypes.GET_ALL_PRODUCTS);
    done();
  });

  it('create an action to GET_ALL_PRODUCTS_SUCCESS to redux store', (done) => {
    expect(productActions.getProductsSuccess(res).type).
    toEqual(actionTypes.GET_ALL_PRODUCTS_SUCCESS);
    done();
  });

  it('create an action to GET_ALL_PRODUCTS_FAILURE to redux store', (done) => {
    expect(productActions.getProductsFailure(error).type).
    toEqual(actionTypes.GET_ALL_PRODUCTS_FAILURE);
    done();
  });
  it('create an action FILTER_ALL_CATEGORIES to set user in store', (done) => {
    expect(productActions.filterAllCategories().type).
    toEqual(actionTypes.FILTER_ALL_CATEGORIES);
    done();
  });

  it('create an action to FILTER_ALL_CATEGORIES_SUCCESS to redux store', (done) => {
    expect(productActions.filterAllCategoriesSuccess(res).type).
    toEqual(actionTypes.FILTER_ALL_CATEGORIES_SUCCESS);
    done();
  });

  it('create an action to FILTER_ALL_CATEGORIES_FAILURE to redux store', (done) => {
    expect(productActions.filterAllCategoriesFailure(error).type).
    toEqual(actionTypes.FILTER_ALL_CATEGORIES_FAILURE);
    done();
  });
  it('create an action FILTER_ALL_DEPARTMENTS to set user in store', (done) => {
    expect(productActions.filterAllDepartments(1).type).
    toEqual(actionTypes.FILTER_ALL_DEPARTMENTS);
    done();
  });

  it('create an action to FILTER_ALL_DEPARTMENTS_SUCCESS to redux store', (done) => {
    expect(productActions.filterAllDepartmentsSuccess(res).type).
    toEqual(actionTypes.FILTER_ALL_DEPARTMENTS_SUCCESS);
    done();
  });

  it('create an action to FILTER_ALL_DEPARTMENTS_FAILURE to redux store', (done) => {
    expect(productActions.filterAllDepartmentsFailure(error).type).
    toEqual(actionTypes.FILTER_ALL_DEPARTMENTS_FAILURE);
    done();
  });
  it('create an action SEARCH_ALL_PRODUCTS to set user in store', (done) => {
    expect(productActions.searchAllProducts('altica').type).
    toEqual(actionTypes.SEARCH_ALL_PRODUCTS);
    done();
  });

  it('create an action to SEARCH_ALL_PRODUCTS_SUCCESS to redux store', (done) => {
    expect(productActions.searchAllProductsSuccess(res).type).
    toEqual(actionTypes.SEARCH_ALL_PRODUCTS_SUCCESS);
    done();
  });

  it('create an action to SEARCH_ALL_PRODUCTS_FAILURE to redux store', (done) => {
    expect(productActions.searchAllProductsFailure(error).type).
    toEqual(actionTypes.SEARCH_ALL_PRODUCTS_FAILURE);
    done();
  });
  it('create an action SINGLE_PRODUCT_DETAILS to set user in store', (done) => {
    expect(productActions.singleProductDetails(2).type).
    toEqual(actionTypes.SINGLE_PRODUCT_DETAILS);
    done();
  });

  it('create an action to SINGLE_PRODUCT_DETAILS_SUCCESS to redux store', (done) => {
    expect(productActions.singleProductDetailsSuccess(res).type).
    toEqual(actionTypes.SINGLE_PRODUCT_DETAILS_SUCCESS);
    done();
  });

  it('create an action to SINGLE_PRODUCT_DETAILS_FAILURE to redux store', (done) => {
    expect(productActions.singleProductDetailsFailure(error).type).
    toEqual(actionTypes.SINGLE_PRODUCT_DETAILS_FAILURE);
    done();
  });
  it('create an action SINGLE_PRODUCT_REVIEWS to set user in store', (done) => {
    expect(productActions.singleProductReviews(3).type).
    toEqual(actionTypes.SINGLE_PRODUCT_REVIEWS);
    done();
  });

  it('create an action to SINGLE_PRODUCT_REVIEWS_SUCCESS to redux store', (done) => {
    expect(productActions.singleProductReviewsSuccess(res).type).
    toEqual(actionTypes.SINGLE_PRODUCT_REVIEWS_SUCCESS);
    done();
  });

  it('create an action to SINGLE_PRODUCT_REVIEWS_FAILURE to redux store', (done) => {
    expect(productActions.singleProductReviewsFailure(error).type).
    toEqual(actionTypes.SINGLE_PRODUCT_REVIEWS_FAILURE);
    done();
  });
  it('create an action ADD_SINGLE_REVIEW to set user in store', (done) => {
    expect(productActions.addSingleReview(7).type).
    toEqual(actionTypes.ADD_SINGLE_REVIEW);
    done();
  });

  it('create an action to ADD_SINGLE_REVIEW_SUCCESS to redux store', (done) => {
    expect(productActions.addSingleReviewSuccess(res).type).
    toEqual(actionTypes.ADD_SINGLE_REVIEW_SUCCESS);
    done();
  });

  it('create an action to ADD_SINGLE_REVIEW_FAILURE to redux store', (done) => {
    expect(productActions.addSingleReviewFailure(error).type).
    toEqual(actionTypes.ADD_SINGLE_REVIEW_FAILURE);
    done();
  });
});
