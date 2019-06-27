import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProfileContainer,{ Profile } from '../index';

describe('<ConnectedHomePage />', () => {
  const props = {
    retrieveCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateUser: jest.fn(),
    updateCart: jest.fn(),
    getUser: jest.fn(),
    getShippingRegions: jest.fn(),
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
    reviews: [{name: 'named', review: 'Terrible product', rating: 4}],
    cartLoading: false,
    allProducts: [],
    shippingRegions: [
      {shipping_region: "Canada/Us", shipping_region_id: 2},
      {shipping_region: "Rest of the World", shipping_region_id: 1}
    ]
  };

  const initialState = {
    products: {
      products: [
        {name: 'altica', product_id: 12, discounted_price: "0.00"},
        {name: 'italia', product_id: 19},
        {name: 'french', product_id: 17},
        {name: 'nigerian', product_id: 15},
        {name: 'christmas cap', product_id: 14}
      ],
      singleProductDetails: {
        product_id: 1,
        name: 'nigerian',
        subtotal: 455,
        thumbnail: 'thumbnail.png',
        image_2: 'image2.png',
        image: 'image.png'
      },
      count: 5,
      loading: false,
      reviews: [{name: 'named', review: 'Terrible product', rating: 4}],
      reviewsLoading: false,
      singleProductLoading: false,
    },
    auth: {
      loading: false,
      user: {
        name: 'Name',
      }
    },
    checkout: {
      shippingRegions: [{shipping_region: "Canada/Us", shipping_region_id: 2},
        {shipping_region: "Rest of the World", shipping_region_id: 1}]
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
    wrapper = mount(<Profile {...props} store={store}/>);
  });

  it('renders appropriately', () => {
    localStorage.setItem("name", "named");
    const wrapped = mount(
      <Provider store={store}>
        <MemoryRouter key="keyed">
          <ProfileContainer {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapped).toMatchSnapshot();
  });

  it('should successfully render signup modal and close it', () => {
    wrapper.setState({displayModal: true, openModal: 'signup'});

    wrapper.find('SignUp').find('.modal-overlay').simulate('click');

    expect(wrapper.find('SignUp').exists()).toEqual(true);
  });

  it('should successfully render signup modal and switch to signin modal', () => {
    wrapper.setState({displayModal: true, openModal: 'signup'});

    wrapper.find('SignUp').find('.additional-options__alternate').find('p').simulate('click');

    expect(wrapper.find('SignIn').exists()).toEqual(true);
  });

  it('should successfully render signin modal', () => {
    wrapper.setState({displayModal: true, openModal: 'signin'});

    expect(wrapper.find('SignIn').exists()).toEqual(true);
  });

  it('should successfully render checkout modal', () => {
    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should simulate updateCart', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('cart_id', '3');

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});
    wrapper.find('CheckoutCart').setState({ changingQuantity: true , 1: {quantity: 3}, 2: {quantity: 4}});
    const inst = wrapper.instance();
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(1).simulate('click');

    wrapper.find('.active-button').simulate('click');

    inst.handleUpdateCart = jest.fn();
    wrapper.find('.active-button').simulate('click');

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should simulate updateCart and simulate checkout while logged out', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('cart_id', '3');

    wrapper.find('ProfileForm').setState({
      values: {
        'Address 1': '1 aminu street',
        'Address 2': 'address 2',
        City: 'Lagos',
        Region: 'South West',
        Country: 'Nigeria',
        'Postal Code': '22321',
        'Shipping Region': 'Rest of the World',
      },
      errors: {
        'Address 1': 'Error out here',
        'Address 2': 'Error out here',
        City: 'Error out here',
        Region: 'Error out here',
        Country: 'Error out here',
        'Postal Code': 'Error out here',
        'Shipping Region': 'Error out here'
      }
    });

    const inst = wrapper.instance();

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});
    wrapper.find('CheckoutCart').setState({ changingQuantity: true , 1: {quantity: 3}, 2: {quantity: 4}});
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(1).simulate('click');

    wrapper.find('.checkout-button').find('button').at(2).simulate('click');

    inst.startCheckout = jest.fn();

    expect(wrapper.find('CheckoutCart').exists()).toEqual(false);
  });

  it('should simulate updateCart and simulate checkout, while logged in', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('cart_id', '3');

    wrapper.setProps({user: {name: 'done'}});

    const inst = wrapper.instance();

    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});
    wrapper.find('CheckoutCart').setState({ changingQuantity: true , 1: {quantity: 3}, 2: {quantity: 4}});
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(0).simulate('click');
    wrapper.find('.checkout-container__quantity').find('img').at(1).simulate('click');

    wrapper.find('.checkout-button').find('button').at(2).simulate('click');

    inst.startCheckout = jest.fn();
    wrapper.find('.checkout-button').find('button').at(2).simulate('click');

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should simulate handleSelectRegion in shipping region', () => {
    wrapper.find('ProfileForm').find('.profile-form__shipping').find('select').simulate('change');
    expect(wrapper.find('ProfileForm').exists()).toEqual(true);
  });

  it('should simulate handleChange in shipping region', () => {
    wrapper.find('ProfileForm').find('form').find('input').at(1).simulate('change');
    expect(wrapper.find('ProfileForm').exists()).toEqual(true);
  });

  it('should simulate handleChange in shipping region with errors in validation', () => {
    wrapper.find('ProfileForm').find('form').find('input').at(1).simulate('change',  {target: {title: 'Address 1', value: 'aminu'}});
    wrapper.find('ProfileForm').find('form').find('input').at(2).simulate('change',  {target: {title: 'Address 2', value: ' '}});
    wrapper.find('ProfileForm').find('form').find('input').at(3).simulate('change',  {target: {title: 'City', value: 'Lagos'}});
    wrapper.find('ProfileForm').find('form').find('input').at(4).simulate('change',  {target: {title: 'Region', value: 'South West'}});
    wrapper.find('ProfileForm').find('form').find('input').at(5).simulate('change',  {target: {title: 'Country', value: 'Nigeria'}});
    wrapper.find('ProfileForm').find('form').find('input').at(6).simulate('change',  {target: {title: 'Postal Code', value: '434'}});
    expect(wrapper.find('ProfileForm').exists()).toEqual(true);
  });

  it('should simulate handleSubmit in Profile Form', () => {
    wrapper.find('ProfileForm').setState({
      values: {
        'Address 1': ' 1 aminu street',
        'Address 2': 'address 2',
        City: 'Lagos',
        Region: 'South West',
        Country: 'Nigeria',
        'Postal Code': '22321',
        'Shipping Region': 'Rest of the World',
      },
      errors: {}
    });
    wrapper.find('ProfileForm').find('form').simulate('submit');
    expect(wrapper.find('ProfileForm').exists()).toEqual(true);
  });
});
