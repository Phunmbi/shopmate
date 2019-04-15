import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import {singleProductDetails, singleProductReviews} from "../../redux/actionCreator/products";
import NavbarHome from '../../components/Navbar/NavbarHome/Index';
import Loading from '../../components/Loading/index';
import NavBarCollapse from '../../components/Navbar/NavBarCollapse/index';
import ProductDetails from '../../components/ProductDetails/index';
import ProductReviews from '../../components/ProductReviews/index';
import Footer from '../../components/Footer/index';
import './SingleProduct.scss';
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import {signUp, signIn} from '../../redux/actionCreator/auth';

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

  renderModals ( displayModal, openModal ) {
    const {authLoading} = this.props;
    switch (openModal) {
      case "signup":
        return (
          <SignUp
            displayModal={displayModal}
            handleCloseModal={this.handleCloseModal}
            signupUser={this.signUpUser}
            authLoading={authLoading}
          />
        );
      case "signin":
        return (
          <SignIn
            displayModal={displayModal}
            handleCloseModal={this.handleCloseModal}
            signInUser={this.signInUser}
            authLoading={authLoading}
          />
        );
      default:
        return null;
    }
  }

	render() {
		const { productDetails, reviewsLoading, reviews, history } = this.props;
		const { displayModal, openModal, quantity, selectedSize,selectedColour } = this.state;
		return (
			<Fragment>
        <div className="product">
					<header>
						<NavbarHome handleDisplayModal={this.handleDisplayModal}/>
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

const mapStateToProps = ({products, auth}) => ({
	productDetails: products.singleProductDetails,
	loadingProduct: products.loading,
  authLoading: auth.loading,
  reviews: products.reviews,
  reviewsLoading: products.reviewsLoading
});

const mapDispatchToProps = {
	signUp,
	signIn,
	singleProductDetails,
  singleProductReviews
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
