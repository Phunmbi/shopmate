import React, {Component, Fragment} from 'react';
import Loading from '../../Loading/index';
import './Shipping.scss'

class Shipping extends Component {
  state = {
    selectedShippingRegion: 1,
    selectedShippingCost: null,
  };
  
  componentDidMount() {
    const { getShippingRegions, getShippingCost } = this.props;
    getShippingRegions();
    getShippingCost(this.state.selectedShippingRegion);
  }
  
  handleSelectRegion = (e) => {
    console.log(e.currentTarget.value);
  };
  
  renderRegions = (shippingRegions) => {
    return shippingRegions.map((region) => {
      return <option key={region.shipping_region_id} value={region.shipping_region_id}>
        {region.shipping_region}
      </option>
    });
  };
  
  render() {
    const {
      loadingRegions,
      shippingRegions
    } = this.props;
    return (
      <Fragment>
        {loadingRegions ?
          <Loading height="480px" size="full" /> :
          (
            <div className="shipping">
              <div className="shipping-main">
                <h3>Checkout</h3>
                <p>Select shipping region</p>
                <div className="shipping-main__dropdowns">
                  <select onChange={(e) => this.handleSelectRegion(e)} name="shipping-region">
                    {this.renderRegions(shippingRegions)}
                  </select>
                  <select name="shipping-time">
                    <option value="1"> </option>
                    <option value="4">By Air(7 days)</option>
                    <option value="5">By Sea(28 days)</option>
                  </select>
                </div>
                <button>Next</button>
              </div>
            </div>
          )
        }
      </Fragment>
    );
  }
}

export default Shipping;
