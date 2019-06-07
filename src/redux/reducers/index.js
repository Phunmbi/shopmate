import {combineReducers} from 'redux';
import auth from './auth';
import products from './products';
import shoppingCart from './shoppingCart'
import checkout from './checkout';

const rootReducer = combineReducers({
	auth,
	products,
	shoppingCart,
	checkout
});

export default rootReducer;
