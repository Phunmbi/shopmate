import {all} from 'redux-saga/effects';
import { watchGetProducts } from './productsSaga';


function* rootSaga () {
  yield all( [
    watchGetProducts()
  ])
}

export default rootSaga;
