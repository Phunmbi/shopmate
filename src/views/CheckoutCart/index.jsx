import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import './CheckoutCart.scss';
import Minus from "../../images/minus.svg";
import Plus from "../../images/plus.svg";
import Multiply from "../../images/multiply.svg";

class CheckoutCart extends Component {
  componentDidMount () {
    const {retrieveCart} = this.props;
    const cart_id = localStorage.getItem("cart_id");
    retrieveCart(cart_id)
  };
  
  componentWillReceiveProps(nextProps, nextContext) {
    const addedToCart = localStorage.getItem("addedToCart");
    return !addedToCart && this.handleAddToCart();
  }
  
  handleBackToShop = () => {
    const { history } = this.props;
    history.push('/');
  };
  
  extractColour = (attributes) => {
    return attributes.split(',')[0];
  };
  
  extractSize = (attributes) => {
    return attributes.split(',')[1]
  };
  
  renderCartDetails = (eachCartItem) => {
    const imageUrl = `https://backendapi.turing.com/images/products/${eachCartItem.name
      .toLowerCase()
      .replace(/\W+(?!$)/g, '-')}.gif`;
    
    const {removeFromCart} = this.props;
    const {attributes} = eachCartItem;
    return (
      <Fragment>
        <div className="checkout-container__itemName">
          <img src={imageUrl} alt=""/>
          <div className="checkout-container__details">
            <h3>{eachCartItem.name}</h3>
            <h4>Colour: {_.upperFirst(this.extractColour(attributes))}</h4>
            <div onClick={() => removeFromCart(eachCartItem.item_id)} className="checkout-container__cancel">
              <p>x</p>
              <p>Remove</p>
            </div>
          </div>
        </div>
        <div className="checkout-container__size">
          <h3>{this.extractSize(attributes)}</h3>
        </div>
        <div className="checkout-container__quantity">
          <img src={Minus} alt=""/>
          <div className="checkout-container__count">
            <p>{eachCartItem.quantity}</p>
          </div>
          <img src={Plus} alt=""/>
        </div>
        <div className="checkout-container__price">
          <h2>£{eachCartItem.subtotal}</h2>
        </div>
      </Fragment>
    )
  };
  
  additionalOptions = (startCheckout) => {
    return(
      <div className="checkout-button">
        <button onClick={() => this.handleBackToShop()}>Back to Shop</button>
        <button disabled>Update</button>
        <button onClick={() => startCheckout()}>Checkout</button>
      </div>
    )
  };
  
  renderModal = () => {
    const { handleCloseModal, cart, cartLoading, startCheckout } = this.props;
    return cartLoading ?
      null :
      (
        <Fragment>
          <div onClick={() => handleCloseModal()} className="checkoutModal-overlay" />
          <div className="checkoutModal-container">
            <div className="checkoutModal-main">
              <div className="checkoutModal-main__center">
                <div className="checkoutModal-main__title">
                  <div className="checkoutModal-main__cancel">
                    <img onClick={() => handleCloseModal()} src={Multiply} alt="Cancel" />
                  </div>
                  <h3>Items in your cart</h3>
                </div>
                <div className="checkoutModal-main__body" >
                  <div className="checkout-container">
                    <div className="checkout-container__heading">
                      <div className="checkout-container__item">
                        <h3>Item</h3>
                      </div>
                      <div>
                        <h3>Size</h3>
                      </div>
                      <div>
                        <h3>Quantity</h3>
                      </div>
                      <div>
                        <h3>Price</h3>
                      </div>
                    </div>
                    <div className="checkout-container__items">
                      {cart.map((eachCartItem) => {
                        return (<div key={eachCartItem.item_id} className="checkout-container__eachItem">
                          {this.renderCartDetails(eachCartItem)}
                        </div>)
                      })}
                    </div>
                  </div>
                </div>
                <div className="checkoutModal-main__additional">{this.additionalOptions(startCheckout)}</div>
              </div>
            </div>
          </div>
        </Fragment>
      )
  };
  
  render() {
    const { displayModal } = this.props;
    return (
      <Fragment>
        {displayModal ?
          (
            this.renderModal()
          ) : null
        }
      </Fragment>
    );
  }
}

export default CheckoutCart;
