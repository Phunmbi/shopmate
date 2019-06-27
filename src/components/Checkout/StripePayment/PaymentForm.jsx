import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import "./PaymentForm.scss";

export class PaymentForm extends Component {
  submit = async () => {
    const { stripeCharge, stripe, orderId, history } = this.props;
    let {token} = await stripe.createToken({name: "Name"});
    token && stripeCharge({
      stripeToken: token.id,
      order_id:orderId,
      description: "Shopmate shopping order",
      amount: Math.round(parseInt(localStorage.getItem("cartTotal"))) * 100, // Round to the nearest pence then convert to pounds
      history
    });
  };

  render() {
    const { redirectPaymentPage, creatingStripeCharge } = this.props;
    return (
      <div className="paymentForm">
        <div className="paymentForm-action">
          <p>Complete your order with Stripe</p>
          <CardElement />
        </div>
        <div className="paymentForm-buttons">
          <button onClick={() => redirectPaymentPage()}>Back</button>
          { creatingStripeCharge ?
            <button className="payment-loading" onClick={() => this.submit()}>Paying...</button> :
            <button onClick={() => this.submit()}>Pay</button>
          }
          </div>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);
