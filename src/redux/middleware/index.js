import {all} from 'redux-saga/effects';
import {
	watchGetProducts,
	watchFilterAllDepartments,
	watchFilterAllCategories,
  watchSearchAllProducts,
  watchSingleProductDetails,
  watchSingleProductReviews,
  watchAddReview
} from './productsSaga';
import {
  watchGetCartId,
  watchAddToCart,
  watchRetrieveCart,
  watchRemoveFromCart,
  watchUpdateCart
} from "./shoppingCartSaga";
import {
  watchSignUp,
  watchSignIn,
  watchGetUser,
} from './authSaga';


function* rootSaga () {
  yield all( [
    watchGetProducts(),
    watchSignUp(),
    watchSignIn(),
    watchGetUser(),
    watchFilterAllDepartments(),
    watchFilterAllCategories(),
    watchSearchAllProducts(),
    watchSingleProductDetails(),
    watchSingleProductReviews(),
    watchGetCartId(),
    watchAddToCart(),
    watchRetrieveCart(),
    watchRemoveFromCart(),
    watchUpdateCart(),
    watchAddReview()
  ])
}

export default rootSaga;
