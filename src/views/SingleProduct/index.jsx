import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import NavbarHome from '../../components/Navbar/NavbarHome/Index';
import Loading from '../../components/Loading/index';
import NavBarCollapse from '../../components/Navbar/NavBarCollapse/index';
import ProductDetails from '../../components/ProductDetails/index';
import ProductReviews from '../../components/ProductReviews/index';
import Footer from '../../components/Footer/index';
import './SingleProduct.scss';
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import CheckoutCart from "../CheckoutCart";
import {signUp, signIn} from '../../redux/actionCreator/auth';
import { addToCart, retrieveCart, removeFromCart, updateCart } from "../../redux/actionCreator/shoppingCart";
import {singleProductDetails, singleProductReviews} from "../../redux/actionCreator/products";
import toaster from "toastr";

export class SingleProduct extends Component {
  state = {
    displayModal: false,
    openModal: "none",
    quantity: 1,
    selectedSize: 'S',
    selectedColour: 'teal'
  };

	componentDidMount () {
		const { match: {params: { productId}}, singleProductDetails, singleProductReviews} = this.props;
		singleProductDetails(productId);
    singleProductReviews(productId);
	}

	handleDisplayModal = (modal) => {
		this.setState({
			displayModal: true,
			openModal: modal
		});
	};

	calculateAverageRating = () => {
	  const {reviews} = this.props;
	  let compiledRatings = 0;
	  reviews.map(eachReview => {
      compiledRatings += eachReview["rating"];
      return compiledRatings;
    });
	  return Math.ceil(compiledRatings/reviews.length);
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
    return total.toFixed(2);
  };
  
  increaseQuantity = () => {
    this.setState({
      ...this.state,
      quantity: this.state.quantity + 1
    })
  };
  
  reduceQuantity = () => {
    if (this.state.quantity === 1) {
      return false;
    }
    
    this.setState(({
      ...this.state,
      quantity: this.state.quantity - 1
    }))
  };

  sizeSelector = (event) => {
    this.setState({
      ...this.state,
      selectedSize: event.target.textContent
    });
  };
  
  handleUpdateCart = (toBeUpdated) => {
    const { updateCart } = this.props;
    toBeUpdated.map((eachItem) => {
      localStorage.setItem(eachItem.changingId, JSON.stringify({
        quantity: eachItem.quantity,
        changingId: eachItem.changingId
      }));
      return updateCart({item_id: eachItem.changingId, quantity: eachItem.quantity});
    });
  };
  
  colourSelector = (event) => {
    this.setState({
      ...this.state,
      selectedColour: event.target.alt
    })
  };
  
  signUpUser = (query) => {
    const {signUp} = this.props;
    signUp(query, this.handleCloseModal);
  };

  signInUser = ( query ) => {
    const {signIn} = this.props;
    signIn(query, this.handleCloseModal);
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
  
  handleAddToCart = () => {
    const { addToCart, productDetails:{product_id} } = this.props;
    const { selectedColour, selectedSize} = this.state;
    
    const cartId = localStorage.getItem("cart_id");
    
    if (cartId) return addToCart({cart_id: cartId, product_id, attributes: `${selectedColour}, ${selectedSize}`});
  };

  renderModals ( displayModal, openModal ) {
    const {
      authLoading,
      history,
      productDetails,
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
            increaseQuantity={this.increaseQuantity}
            reduceQuantity={this.reduceQuantity}
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
        break;
    }
  }

	render() {
		const {
		  productDetails,
      reviewsLoading,
      reviews,
      history,
      cart
		} = this.props;
		const { displayModal, openModal, quantity, selectedSize,selectedColour } = this.state;
		return (
			<Fragment>
        <div className="product">
					<header>
						<NavbarHome
              cartCount={cart.length}
              retrieveCart={this.handleRetrieveCart}
              handleDisplayModal={this.handleDisplayModal}
              bagTotal={this.calculateBagTotal}
            />
						<NavBarCollapse history={history}/>
					</header>
          {
            reviewsLoading ?
              <Loading height="900px" /> :
              (
                <Fragment>
                  <section className="product-details">
                    <ProductDetails
                      productDetails={productDetails}
                      averageRating={this.calculateAverageRating()}
                      quantity={quantity}
                      increaseQuantity={this.increaseQuantity}
                      reduceQuantity={this.reduceQuantity}
                      sizeSelector={this.sizeSelector}
                      selectedSize={selectedSize}
                      selectedColour={selectedColour}
                      colourSelector={this.colourSelector}
                      handleDisplayModal={this.handleDisplayModal}
                      handleAddToCart={this.handleAddToCart}
                    />
                  </section>
                  <section className="product-reviews">
                    <ProductReviews reviews={reviews} />
                  </section>
                </Fragment>
            )
          }
          <footer className="footer">
            <Footer />
          </footer>
				</div>

        {this.renderModals(displayModal, openModal)}
			</Fragment>
		);
	}
}

const mapStateToProps = ({products, auth, shoppingCart}) => ({
	productDetails: products.singleProductDetails,
	loadingProduct: products.loading,
  authLoading: auth.loading,
  reviews: products.reviews,
  reviewsLoading: products.reviewsLoading,
  cart_Id: shoppingCart.cart_Id,
  cart: shoppingCart.cart,
  cartLoading: shoppingCart.loadingShoppingCart
});

const mapDispatchToProps = {
	signUp,
	signIn,
	singleProductDetails,
  singleProductReviews,
  addToCart,
  retrieveCart,
  removeFromCart,
  updateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
