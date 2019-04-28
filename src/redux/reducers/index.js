import {combineReducers} from 'redux';
import auth from './auth';
import products from './products';
import shoppingCart from './shoppingCart'

const rootReducer = combineReducers({
	auth,
	products,
	shoppingCart
});

export default rootReducer;
