import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import './Checkout.scss';
import NavbarHome from '../../components/Navbar/NavbarHome/Index';
import NavBarCollapse from '../../components/Navbar/NavBarCollapse/index';
import { retrieveCart } from "../../redux/actionCreator/shoppingCart";
import Footer from '../../components/Footer/index';

export class Checkout extends Component {
  state = {
  
  };
  
  handleRetrieveCart = () => {
    const { retrieveCart } = this.props;
    const cart_id = localStorage.getItem("cart_id");
    retrieveCart(cart_id);
  };
  
  calculateBagTotal = () => {
    const { cart } = this.props;
    let total = 0;
    cart.map((eachItem) => {
      return total += parseFloat(eachItem.subtotal);
    });
    return total.toFixed(2);
  };
  
  render() {
    const {history, cart} = this.props;
    return (
      <Fragment>
        <div className='checkout'>
          <header>
            <NavbarHome
              cartCount={cart.length}
              retrieveCart={this.handleRetrieveCart}
              bagTotal={this.calculateBagTotal}
            />
            <NavBarCollapse history={history}/>
          </header>
          <h3>Checkout</h3>
  
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({shoppingCart}) => ({
  cart_Id: shoppingCart.cart_Id,
  cart: shoppingCart.cart,
  cartLoading: shoppingCart.loadingShoppingCart
});

const mapDispatchToProps = {
  retrieveCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
