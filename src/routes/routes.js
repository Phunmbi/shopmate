import Checkout from '../views/Checkout';
import SingleProduct from '../views/SingleProduct';
import Profile from '../views/Profile';

const routes = {
	'/checkout': [Checkout],
	'/product/:productId': [SingleProduct],
  '/profile': [Profile]
};

export default routes;
