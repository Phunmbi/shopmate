import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import './Checkout.scss';
import NavBarCollapse from '../../components/Navbar/NavBarCollapse/index';
import Shipping from '../../components/Checkout/Shipping/index';
import Footer from '../../components/Footer/index';
import {getShippingRegions, getShippingCost} from '../../redux/actionCreator/checkout'

export class Checkout extends Component {
  state = {
  
  };
  
  render() {
    const {
      history,
      getShippingCost,
      getShippingRegions,
      shippingCost,
      shippingRegions,
      loadingCost,
      loadingRegions
    } = this.props;
    return (
      <Fragment>
        <div className='checkout'>
          <header>
            <NavBarCollapse history={history}/>
          </header>
          
          <section>
            <Shipping
              loadingCost={loadingCost}
              loadingRegions={loadingRegions}
              getShippingCost={getShippingCost}
              getShippingRegions={getShippingRegions}
              shippingCost={shippingCost}
              shippingRegions={shippingRegions}
            />
          </section>
  
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({checkout}) => ({
  shippingRegions: checkout.shippingRegions,
  loadingRegions: checkout.loadingRegions,
  loadingCost: checkout.loadingCost,
  shippingCost: checkout.shippingCost
});

const mapDispatchToProps = {
  getShippingRegions,
  getShippingCost
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
