import React, {Component, Fragment} from 'react';
import Toaster from 'toastr';
import Loading from '../../Loading/index';
import './Shipping.scss'

class Shipping extends Component {
  state = {
    selectedShippingRegion: 1,
    selectedShippingRegionText: null,
    selectedShippingCost: '',
    selectedShippingCostText: null,
  };
  
  componentDidMount() {
    const { getShippingRegions, getShippingCost } = this.props;
    getShippingRegions();
    getShippingCost(this.state.selectedShippingRegion);
  }

  componentDidUpdate(prevProps, prevState) {
    const { getShippingCost } = this.props;

    if (prevState.selectedShippingRegion !== this.state.selectedShippingRegion) {
      getShippingCost(this.state.selectedShippingRegion);
    }
  }

  handleSelectRegion = (e) => {
    const { shippingRegions } = this.props;

    const selectedRegion = shippingRegions.filter((each) => {
      return each.shipping_region_id === parseInt(e.currentTarget.value);
    });

    this.setState( {
      ...this.state,
      selectedShippingRegionText: selectedRegion[0].shipping_region,
      selectedShippingRegion: e.currentTarget.value
    });
  };

  handleSelectCost = (e) => {
    const { shippingCost } = this.props;

    const selectedCost = shippingCost.filter((each) => {

      console.log( 'each', each, '======>>> ee', e.currentTarget.value);
      return each.shipping_id === parseInt(e.currentTarget.value);
    });

    this.setState({
      ...this.state,
      selectedShippingCostText: selectedCost[0].shipping_type,
      selectedShippingCost: e.currentTarget.value
    })
  };

  handleSubmit = async () => {
    const { selectedShippingRegionText, selectedShippingCostText, selectedShippingCost } = this.state;
    const { handleSubmitShippingDetails, createOrder } = this.props;
    if (selectedShippingCost === null || selectedShippingCost === "") {
      return Toaster.error('Please select a cost for your region');
    }

    await createOrder({cart_id: localStorage.getItem('cart_id'), shipping_id: selectedShippingCost});
    handleSubmitShippingDetails(selectedShippingRegionText, selectedShippingCostText);
  };

  renderRegions = (shippingRegions) => {
    return shippingRegions.map((region) => {
      return <option key={region.shipping_region_id} value={region.shipping_region_id} label={region.shipping_region}>
        {region.shipping_region}
      </option>
    });
  };

  renderCosts = (shippingCosts) => {
    return shippingCosts.map((cost) => {
      return <option key={cost.shipping_id} value={cost.shipping_id} label={cost.shipping_type}>
        {cost.shipping_type}
      </option>
    });
  };
  
  render() {
    const {
      loadingRegions,
      shippingRegions,
      shippingCost
    } = this.props;
    return (
      <Fragment>
        {loadingRegions ?
          <Loading height="67vh" size="full" /> :
          (
            <div className="shipping">
              <div className="shipping-main">
                <h1>Checkout</h1>
                <div className="shipping-main__actions">
                  <p>Select shipping region</p>
                  <div className="shipping-main__dropdowns">
                    <select
                      onChange={(e) => this.handleSelectRegion(e)}
                      value={this.state.selectedShippingRegion}
                      name="shipping-region">
                      {this.renderRegions(shippingRegions)}
                    </select>
                    <select onChange={(e) => this.handleSelectCost(e)} value={this.state.selectedShippingCost} name="shipping-time">
                      <option> </option>
                      {this.renderCosts(shippingCost)}
                    </select>
                  </div>
                </div>
                <button onClick={() => this.handleSubmit()}>Next</button>
              </div>
            </div>
          )
        }
      </Fragment>
    );
  }
}

export default Shipping;
