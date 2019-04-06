import {all} from 'redux-saga/effects';
import {
	watchGetProducts,
	watchFilterAllDepartments,
	watchFilterAllCategories,
} from './productsSaga';
import {watchSignUp, watchSignIn} from './authSaga';


function* rootSaga () {
  yield all( [
    watchGetProducts(),
    watchSignUp(),
    watchSignIn(),
    watchFilterAllDepartments(),
    watchFilterAllCategories(),
  ])
}

export default rootSaga;
