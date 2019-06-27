import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import {Elements, StripeProvider} from 'react-stripe-elements';
import './Checkout.scss';
import NavBarCollapse from '../../components/Navbar/NavBarCollapse/index';
import Shipping from '../../components/Checkout/Shipping/index';
import OrderDetails from '../../components/Checkout/OrderDetails/index';
import Footer from '../../components/Footer/index';
import {getShippingRegions, getShippingCost, createOrder, stripeCharge} from '../../redux/actionCreator/checkout'
import PaymentForm from "../../components/Checkout/StripePayment/PaymentForm";

export class Checkout extends Component {
  state = {
    selectedRegion: '',
    selectedCost: '',
    isOrderDetailsComplete: false,
    isOrderCreatedAndConfirmed: false,
  };

  handleSubmitShippingDetails = (selectedRegion, selectedCost) => {
    this.setState({
      ...this.state,
      selectedCost: selectedCost,
      selectedRegion: selectedRegion,
      isOrderDetailsComplete: true,
    })
  };

  redirectCheckoutPage = () => {
    this.setState({
      ...this.state,
      isOrderDetailsComplete: false,
    })
  };

  redirectPaymentPage = () => {
    this.setState({
      ...this.state,
      isOrderCreatedAndConfirmed: false
    })
  };

  handlePaymentNext = () => {
    this.setState({
      ...this.state,
      isOrderCreatedAndConfirmed: true,
    })
  };

  renderStripePayment = () => {
    const { history, orderId, stripeCharge, stripeChargeResponse, creatingStripeCharge } = this.props;
    return (
      <StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
        <div className="stripe-payment">
          <div className="stripe-payment__main">
            <h1>Checkout</h1>
            <Elements>
              <PaymentForm
                history={history}
                orderId={orderId}
                redirectPaymentPage={this.redirectPaymentPage}
                stripeCharge={stripeCharge}
                stripeChargeResponse={stripeChargeResponse}
                creatingStripeCharge={creatingStripeCharge}
              />
            </Elements>
          </div>
        </div>
      </StripeProvider>
    )
  };

  render() {
    const {
      cart,
      history,
      getShippingCost,
      getShippingRegions,
      shippingCost,
      shippingRegions,
      loadingCost,
      loadingRegions,
      creatingOrder,
      createOrder,
    } = this.props;

    const { isOrderDetailsComplete, isOrderCreatedAndConfirmed, selectedRegion, selectedCost } = this.state;
    return (
      <Fragment>
        <div className='checkout'>
          <header>
            <NavBarCollapse history={history}/>
          </header>
          
          <section>
            {isOrderDetailsComplete ?
             isOrderCreatedAndConfirmed ?
              this.renderStripePayment() :
              (<OrderDetails
                cart={cart}
                history={history}
                selectedRegion={selectedRegion}
                selectedCost={selectedCost}
                creatingOrder={creatingOrder}
                redirectPage={this.redirectCheckoutPage}
                handleNext={this.handlePaymentNext}
              />)
              :
              (<Shipping
                loadingCost={loadingCost}
                loadingRegions={loadingRegions}
                getShippingCost={getShippingCost}
                getShippingRegions={getShippingRegions}
                shippingCost={shippingCost}
                shippingRegions={shippingRegions}
                createOrder={createOrder}
                handleSubmitShippingDetails={this.handleSubmitShippingDetails}
              />)
            }
          </section>

          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({checkout, shoppingCart}) => ({
  cart: shoppingCart.cart,
  shippingRegions: checkout.shippingRegions,
  loadingRegions: checkout.loadingRegions,
  loadingCost: checkout.loadingCost,
  shippingCost: checkout.shippingCost,
  orderId: checkout.orderId,
  creatingOrder : checkout.creatingOrder,
  creatingStripeCharge: checkout.creatingStripeCharge,
  stripeChargeResponse: checkout.stripeChargeResponse
});

const mapDispatchToProps = {
  getShippingRegions,
  getShippingCost,
  createOrder,
  stripeCharge
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
