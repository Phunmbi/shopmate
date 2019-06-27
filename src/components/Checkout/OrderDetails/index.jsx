import React, {Component, Fragment} from 'react';
import Loading from '../../Loading/index';
import './OrderDetails.scss'

export class OrderDetails extends Component {
  renderEntries = (cart) => {
    return cart.map((eachEntry) => {
      return (<div key={eachEntry.item_id} className="shipping-main__entries">
        <p className="shipping-main__initial">{eachEntry.name}</p>
        <p>{eachEntry.quantity}</p>
        <p>£{eachEntry.subtotal}</p>
      </div>)
    });
  };

  render() {
    const {
      redirectPage,
      cart,
      selectedCost,
      selectedRegion,
      handleNext,
      creatingOrder
    } = this.props;
    return (
      <Fragment>
        {creatingOrder ?
          <Loading height="67vh" size="full" /> :
          (
            <div className="shipping">
              <div className="shipping-main">
                <h1>Checkout</h1>
                <div className="shipping-main__container">
                  <p>Order Summary</p>
                  <div className="shipping-main__details">
                    <div className="shipping-main__cart">
                      <div className="shipping-main__heading">
                        <h3 className="shipping-main__initial">Item</h3>
                        <h3>Quantity</h3>
                        <h3>Price</h3>
                      </div>
                      {this.renderEntries(cart)}
                      <div className="shipping-main__totals">
                        <h3>Total Price</h3>
                        <h3>£{localStorage.getItem('cartTotal')}</h3>
                      </div>
                    </div>
                    <div className="shipping-main_shipping">
                      <h3>Shipping Region</h3>
                      <p>{selectedRegion}</p>
                      <h3>Shipping Cost</h3>
                      <p>{selectedCost}</p>
                    </div>
                  </div>
                </div>
                <div className="shipping-main__buttons">
                  <button onClick={() => redirectPage()}>Back</button>
                  <button onClick={() => handleNext()}>Next</button>
                </div>
              </div>
            </div>
          )
        }
      </Fragment>
    );
  }
}

export default OrderDetails;
