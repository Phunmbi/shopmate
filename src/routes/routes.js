import Checkout from '../views/Checkout';
import Catalogue from '../views/Catalogue';
import SingleProduct from '../views/SingleProduct';

const routes = {
	'/checkout': [Checkout],
	'/catalogue': [Catalogue],
	'/product/:productId': [SingleProduct]
};

export default routes;
