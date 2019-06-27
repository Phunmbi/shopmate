import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import NavbarHome from "../../components/Navbar/NavbarHome/Index";
import { retrieveCart, removeFromCart, updateCart } from "../../redux/actionCreator/shoppingCart";
import { getUser, updateUser } from '../../redux/actionCreator/auth';
import { getShippingRegions } from '../../redux/actionCreator/checkout';
import Footer from "../../components/Footer";
import NavBarCollapse from "../../components/Navbar/NavBarCollapse";
import ProfileForm from '../../components/ProfileForm';
import toaster from "toastr";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import CheckoutCart from "../CheckoutCart";
import './Profile.scss';

export class Profile extends Component {
  state = {
    displayModal: false,
    openModal: "none",
  };

  handleDisplayModal = (modal) => {
    this.setState({
      displayModal: true,
      openModal: modal
    });
  };

  handleCloseModal = () => {
    this.setState( {
      displayModal: false,
    })
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
    localStorage.setItem('cartTotal', total.toFixed(2));
    return total.toFixed(2);
  };

  handleUpdateCart = (toBeUpdated) => {
    const { updateCart} = this.props;
    toBeUpdated.map((eachItem) => {
      localStorage.setItem(eachItem.changingId, JSON.stringify({
        quantity: eachItem.quantity,
        changingId: eachItem.changingId
      }));
      return updateCart({item_id: eachItem.changingId, quantity: eachItem.quantity});
    });
  };

  startCheckout = () => {
    const { history } = this.props;
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn) {
      return history.push('/checkout')
    }
    toaster.error('Please sign into your account first');
    this.handleDisplayModal('signin');
  };

  renderModals ( displayModal, openModal ) {
    const {
      authLoading,
      productDetails,
      history,
      cart,
      cartLoading,
      removeFromCart
    } = this.props;
    switch (openModal) {
      case "signup":
        return (
          <SignUp
            displayModal={displayModal}
            handleCloseModal={this.handleCloseModal}
            handleDisplayModal={this.handleDisplayModal}
            signupUser={this.signUpUser}
            authLoading={authLoading}
          />
        );
      case "signin":
        return (
          <SignIn
            displayModal={displayModal}
            handleCloseModal={this.handleCloseModal}
            handleDisplayModal={this.handleDisplayModal}
            signInUser={this.signInUser}
            authLoading={authLoading}
          />
        );
      case "checkoutCart":
        return (
          <CheckoutCart
            productDetails={productDetails}
            displayModal={displayModal}
            handleCloseModal={this.handleCloseModal}
            history={history}
            cart={cart}
            loadingShoppingCart={cartLoading}
            retrieveCart={this.handleRetrieveCart}
            removeFromCart={removeFromCart}
            startCheckout={this.startCheckout}
            handleUpdateCart={this.handleUpdateCart}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { cart, history, getUser, updateUser, user, getShippingRegions, shippingRegions } = this.props;
    const { displayModal, openModal } = this.state;
    return (
      <Fragment>
        <div className="homepage">
          <header className="navbar">
            <NavbarHome
              cartCount={cart.length}
              retrieveCart={this.handleRetrieveCart}
              handleDisplayModal={this.handleDisplayModal}
              bagTotal={this.calculateBagTotal}
            />
            <NavBarCollapse history={history}/>
          </header>

          <div className="profile">
            <ProfileForm
              history={history}
              getUser={getUser}
              updateUser={updateUser}
              userDetails={user}
              getShippingRegions={getShippingRegions}
              shippingRegions={shippingRegions}
            />
          </div>

          <footer className="footer">
            <Footer />
          </footer>
        </div>

        {this.renderModals(displayModal, openModal)}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ products, auth, checkout, shoppingCart }) => ({
  shippingRegions: checkout.shippingRegions,
  allProducts: products.products,
  productsCount: products.count,
  productsLoading: products.loading,
  authLoading: auth.loading,
  user: auth.user,
  productsResponse: products,
  cart: shoppingCart.cart,
  productDetails: products.singleProductDetails,
  cart_Id: shoppingCart.cart_Id,
  cartLoading: shoppingCart.loadingShoppingCart
});

const mapDispatchToProps = {
  retrieveCart,
  updateCart,
  removeFromCart,
  getUser,
  updateUser,
  getShippingRegions
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);