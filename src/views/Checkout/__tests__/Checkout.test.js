import React from 'react';
import { Provider } from 'react-redux';
import {StripeProvider, Elements} from 'react-stripe-elements';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CheckoutContainer,{ Checkout } from '../index';
import {PaymentForm} from "../../../components/Checkout/StripePayment/PaymentForm";
import OrderDetails from "../../../components/Checkout/OrderDetails";

describe('<ConnectedHomePage />', () => {
  const props = {
    stripeCharge: jest.fn(),
    createOrder: jest.fn(),
    getShippingCost: jest.fn(),
    getShippingRegions: jest.fn(),
    handleNext: jest.fn(),
    redirectPaymentPage: jest.fn(),
    stripe: {
      createToken: jest.fn().mockReturnValue({token:true})
    },
    cart: [
      {name: 'adeniyi', attributes: "Blue, S", item_id: 1, quantity: 3},
      {name: 'victor', attributes: "Purple, S", item_id: 2, quantity: 4}],
    history: {
      push: jest.fn()
    },
    productDetails: {
      product_id: 1,
      name: 'nigerian',
      subtotal: 455,
      thumbnail: 'thumbnail.png',
      image_2: 'image2.png',
      image: 'image.png'
    },
    shippingRegions: [
      {shipping_region: "Canada/Us", shipping_region_id: 2},
      {shipping_region: "Rest of the World", shipping_region_id: 1}
    ],
    creatingStripeCharge: false,
    shippingCost: [
      {shipping_id: 4, shipping_type: '28 days'}
    ]
  };

  const initialState = {
    checkout: {
      order_id: '43785ff',
      creatingOrder: false,
      creatingStripeCharge: false,
      stripeChargeResponse: {
        shipping_region: 'Rest of the world'
      },
      shippingRegions: [
        {shipping_region: "Canada/Us", shipping_region_id: 2},
        {shipping_region: "Rest of the World", shipping_region_id: 1}
      ],
      loadingRegions: false,
      loadingCost: false,
      shippingCost: [
        {shipping_id: 4, shipping_type: '28 days'}
      ]
    },
    shoppingCart: {
      cart: [{name: 'adeniyi', attributes: "Blue, S", item_id: 1, quantity: 3},
        {name: 'victor', attributes: "Purple, S", item_id: 2, quantity: 4}],
      cart_Id: 4,
      loadingShoppingCart: false
    },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  let wrapper;

  beforeEach(() => {
    localStorage.setItem("name", "named");
    wrapper = mount(<Checkout {...props} store={store}/>);
  });

  it('renders appropriately', () => {
    localStorage.setItem("name", "named");
    const wrapped = mount(
      <Provider store={store}>
        <MemoryRouter key="keyed">
          <CheckoutContainer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapped).toMatchSnapshot();
  });

  it('should simulate shipping component loading', () => {
    wrapper.setProps({loadingRegions: true});

    expect(wrapper.find('Shipping').exists()).toEqual(true);
  });

  it('should simulate shipping component handleSelectRegion', () => {
    wrapper.find('Shipping').find('.shipping-main__dropdowns').find('select').at(0).simulate('change');

    expect(wrapper.find('Shipping').exists()).toEqual(true);
  });

  it('should simulate shipping component handleSubmit', () => {
    wrapper.find('Shipping').find('.shipping-main').find('button').simulate('click');

    expect(wrapper.find('Shipping').exists()).toEqual(true);
  });

  it('should simulate shipping component handleSubmit with selectedShippingCost', () => {
    wrapper.find('Shipping').setState({selectedShippingCost: 2});

    wrapper.find('Shipping').find('.shipping-main').find('button').simulate('click');

    expect(wrapper.find('Shipping').exists()).toEqual(true);
  });

  it('should simulate OrderDetails loading', () => {
    wrapper.setState({isOrderDetailsComplete: true, isOrderCreatedAndConfirmed: false});
    wrapper.setProps({creatingOrder: true});

    expect(wrapper.find('OrderDetails').exists()).toEqual(true);
  });

  it('should simulate OrderDetails redirect back button', () => {
    wrapper.setState({isOrderDetailsComplete: true, isOrderCreatedAndConfirmed: false});

    wrapper.find('OrderDetails').find('.shipping-main__buttons').find('button').at(0).simulate('click');

    expect(wrapper.find('OrderDetails').exists()).toEqual(false);
  });

  it('should simulate OrderDetails Next Button', () => {
    wrapper.setState({isOrderDetailsComplete: true, isOrderCreatedAndConfirmed: false});

    const inst = wrapper.instance();

    inst.handlePaymentNext = jest.fn();
    inst.handlePaymentNext();

    expect(inst.handlePaymentNext).toHaveBeenCalled();
  });

  it('should simulate handleNext Next Button', () => {
    wrapper.setState({isOrderDetailsComplete: true, isOrderCreatedAndConfirmed: false});

    const wrapped = mount (
      <StripeProvider stripe={null}>
        <Elements>
          <OrderDetails {...props} store={store}/>
        </Elements>
      </StripeProvider>
    );

    wrapped.find('.shipping-main__buttons').find('button').at(1).simulate('click');

    expect(wrapped.exists()).toEqual(true);
  });

  it('should simulate Stripe Payment', () => {
    const wrapped = shallow (
      <StripeProvider stripe={null}>
        <Elements>
          <Checkout {...props} store={store} />
        </Elements>
      </StripeProvider>
    );

    wrapped.setState({isOrderDetailsComplete: true, isOrderCreatedAndConfirmed: true});

    expect(wrapped.find('PaymentForm').exists()).toEqual(false);
  });

  it('should mount and simulate PaymentForm and simulate submit', () => {
    const wrapped = mount (
      <StripeProvider stripe={null}>
        <Elements>
          <PaymentForm {...props} store={store} />
        </Elements>
      </StripeProvider>
    );

    wrapped.find('.paymentForm-buttons').find('button').at(1).simulate('click');

    expect(wrapped.find('PaymentForm').exists()).toEqual(true);
  });

  it('should mount and simulate PaymentForm and simulate back', () => {
    const wrapped = mount (
      <StripeProvider stripe={null}>
        <Elements>
          <PaymentForm {...props} store={store} />
        </Elements>
      </StripeProvider>
    );

    wrapped.find('.paymentForm-buttons').find('button').at(0).simulate('click');

    expect(wrapped.find('PaymentForm').exists()).toEqual(true);
  });

  it('should mount and simulate PaymentForm and simulate payment loading', () => {
    const wrapped = mount (
      <StripeProvider stripe={null}>
        <Elements>
          <PaymentForm {...{...props, creatingStripeCharge: true}} store={store} />
        </Elements>
      </StripeProvider>
    );

    wrapped.setProps();
    wrapped.find('.paymentForm-buttons').find('button').at(1).simulate('click');

    expect(wrapped.find('PaymentForm').exists()).toEqual(true);
  });
});
