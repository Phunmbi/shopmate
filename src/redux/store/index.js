import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../middleware';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(logger, sagaMiddleware);
const store = createStore( rootReducer, middleware );

sagaMiddleware.run(rootSaga);

export default store;
