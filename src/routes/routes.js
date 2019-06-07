import Checkout from '../views/Checkout';
import SingleProduct from '../views/SingleProduct';

const routes = {
	'/checkout': [Checkout],
	'/product/:productId': [SingleProduct],
};

export default routes;
