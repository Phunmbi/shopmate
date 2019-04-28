import React, {Component, Fragment} from 'react'
import checkoutBag from '../../images/cart-white.svg';
import './Cart.scss'

export class Cart extends Component {
  render() {
		const { cartCount } = this.props;
    return (
			<Fragment>
				<div className="cart-main">
					<img src={checkoutBag} alt="Checkout Bag" />
					<div className="cart-main__count">{cartCount}</div>
				</div>
			</Fragment>
		);
  }
}

export default Cart;
