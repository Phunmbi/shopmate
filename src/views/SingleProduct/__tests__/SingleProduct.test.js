import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SingleProductContainer,{ SingleProduct } from '../index';

describe('<ConnectedHomePage />', () => {
  const props = {
    signUp: jest.fn(),
    signIn: jest.fn(),
    searchAllProducts: jest.fn(),
    getCartId: jest.fn(),
    addToCart: jest.fn(),
    retrieveCart: jest.fn(),
    addSingleReview: jest.fn(),
    removeFromCart: jest.fn(),
    updateCart: jest.fn(),
    singleProductDetails: jest.fn(),
    singleProductReviews: jest.fn(),
    match: {
      params: {
        product_id: 1
      }
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
      thumbnail:'thumbnail.png',
      image_2: 'image2.png',
      image: 'image.png'
    },
    reviews: [{name: 'named', review: 'Terrible product', rating: 4}],
    cartLoading: false,
    handleSearch: jest.fn,
    allProducts: []
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
        thumbnail:'thumbnail.png',
        image_2: 'image2.png',
        image: 'image.png'
      },
      loading: false,
      reviews: [{name: 'named', review: 'Terrible product', rating: 4}],
      reviewsLoading: false,
      singleProductLoading: false,
    },
    auth: {
      loading: false
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
    wrapper = mount(<SingleProduct {...props} store={store}/>);
    localStorage.clear();
  });

  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should properly render Product with store connections', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleProductContainer {...props} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should successfully load both product and review loaders', () => {
    wrapper.setProps({reviewsLoading: true, singleProductLoading: true});

    expect(wrapper.find('Loading').exists()).toEqual(true);
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

  it('should successfully render signup modal and simulate signup', () => {
    wrapper.setState({displayModal: true, openModal: 'signup'});

    wrapper.find('SignUp').find('form').simulate('submit');

    expect(wrapper.find('SignUp').exists()).toEqual(true);
  });

  it('should successfully render signin modal', () => {
    wrapper.setState({displayModal: true, openModal: 'signin'});

    expect(wrapper.find('SignIn').exists()).toEqual(true);
  });

  it('should successfully render signin modal and simulate signin', () => {
    wrapper.setState({displayModal: true, openModal: 'signin'});

    wrapper.find('SignIn').find('form').simulate('submit');

    expect(wrapper.find('SignIn').exists()).toEqual(true);
  });

  it('should successfully render checkout modal', () => {
    wrapper.setState({displayModal: true, openModal: 'checkoutCart'});

    expect(wrapper.find('CheckoutCart').exists()).toEqual(true);
  });

  it('should render ProductDetails and select Colour and size', () => {
    const inst = wrapper.instance();

    wrapper.find('ProductDetails').find('.product-details__sizeButton').simulate('click');

    inst.colourSelector = jest.fn();
    inst.sizeSelector = jest.fn();

    wrapper.find('ProductDetails').find('.product-details__eachColor').simulate('click');
    wrapper.find('ProductDetails').find('.product-details__sizeButton').simulate('click');
    expect(inst.colourSelector).toHaveBeenCalledTimes(0);
    expect(inst.sizeSelector).toHaveBeenCalledTimes(1);
  });

  it('should simulate the quantityClicker ', () => {
    const inst = wrapper.instance();

    wrapper.find('ProductDetails').find('.product-details__quantityClicker').find('img').at(1).simulate('click');
    wrapper.find('ProductDetails').find('.product-details__quantityClicker').find('img').at(0).simulate('click');

    inst.reduceQuantity = jest.fn();
    inst.increaseQuantity = jest.fn();

    wrapper.find('ProductDetails').find('.product-details__quantityClicker').find('img').at(1).simulate('click');
    wrapper.find('ProductDetails').find('.product-details__quantityClicker').find('img').at(0).simulate('click');

    expect(inst.increaseQuantity).toHaveBeenCalledTimes(0);
    expect(inst.reduceQuantity).toHaveBeenCalledTimes(1);
  });

  it('should simulate reduce quantity when quantity is 1', function () {
    const inst = wrapper.instance();

    wrapper.find('ProductDetails').find('.product-details__quantityClicker').find('img').at(0).simulate('click');

    inst.reduceQuantity = jest.fn();
    wrapper.find('ProductDetails').find('.product-details__quantityClicker').find('img').at(0).simulate('click');

    expect(inst.reduceQuantity).toHaveBeenCalledTimes(0);
  });

  it('should simulate add to cart', () => {
    const inst = wrapper.instance();
    wrapper.find('ProductDetails').find('.product-details__action').find('button').simulate('click');

    localStorage.setItem("cart_id", 'idCart');
    inst.handleAddToCart = jest.fn();

    wrapper.find('ProductDetails').find('.product-details__action').find('button').simulate('click');

    expect(wrapper.find('ProductDetails').exists()).toEqual(true);
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

  it('should simulate updateCart and simulate checkout, while logged in', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('cart_id', '3');

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

  it('should simulate updateCart and simulate checkout while logged out', () => {
    //Set in test local storage mocks
    localStorage.setItem('1', JSON.stringify({quantity: 3}));
    localStorage.setItem('2', JSON.stringify({quantity: 4}));
    localStorage.setItem('cart_id', '3');

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

  it('should simulate handleAddReviews', () => {
    const inst = wrapper.instance();

    wrapper.find('ProductReviews').find('AddReview').find('.add-review__submit').find('input').simulate('click');

    localStorage.setItem("isAuthenticated", "true");
    inst.handleAddSingleReview = jest.fn();
    wrapper.find('ProductReviews').find('AddReview').find('.add-review__submit').find('input').simulate('click');

    expect(wrapper.find('AddReview').exists()).toEqual(true);
  });

  it('should simulate the handleChange in Add Reviews', () => {
    wrapper.find('ProductReviews').find('AddReview').find('.add-review__reviewDetails').find('textarea').simulate('change');

    expect(wrapper.find('AddReview').exists()).toEqual(true);
  });

  it('should simulate the handleRating in Add Reviews silverStars', () => {
    wrapper.find('ProductReviews').find('AddReview').find('.add-review__stars').find('img').at(1).simulate('click');

    expect(wrapper.find('AddReview').exists()).toEqual(true);
  });

  it('should simulate the handleRating in Add Reviews Gold stars', () => {
    const inst = wrapper.find('AddReview').instance();
    inst.setState({
      values: {
        nickname: "",
        review: "",
        rating: 0,
        stars: {
          1: "gold",
          2: "gold",
          3: "silver",
          4: "silver",
          5: "silver",
        }
      }
    });
    wrapper.find('ProductReviews').find('AddReview').find('.add-review__stars').find('img').at(1).simulate('click');

    expect(wrapper.find('AddReview').exists()).toEqual(true);
  });


  it('should simulate the else on displaying reviews component in ProductReviews', () => {
    wrapper.setProps({reviews: []});

    expect(wrapper.find('ProductReviews').exists()).toEqual(true);
  });

  it('should simulate singleProductLoading component in ProductDetails', () => {
    wrapper.setProps({
      productDetails: {
        product_id: 1,
        name: 'nigerian',
        subtotal: 455,
        thumbnail:'thumbnail.png',
        image_2: 'image2.png',
        image: 'image.png',
        discounted_price: "0.00"
      }
    });
    wrapper.find('ProductDetails').find('.product-details__thumbnails').find('img').at(0).simulate('mouseOver');
    wrapper.find('ProductDetails').find('.product-details__thumbnails').find('img').at(1).simulate('mouseOver');

    expect(wrapper.find('ProductDetails').exists()).toEqual(true);
  });

  it('should simulate through NavBarCollapse redirection to homePage', () => {
    localStorage.setItem("isAuthenticated", "true");

    wrapper.find('.navbar-collapse__container').find('h3').simulate('click');

    expect(wrapper.exists()).toEqual(true);
  });

  it('should simulate through NavBarCollapse and simulate renderDropDown menu', () => {
    localStorage.setItem("isAuthenticated", "true");
    wrapper.find('.navbar-collapse__container').find('img').simulate('click');

    wrapper.find('.dropdown-main').find('p').at(0).simulate('click');

    expect(wrapper.find('NavBarCollapse').exists()).toEqual(true);
  });

  it('should simulate through NavBarCollapse redirection to profile page', () => {
    localStorage.setItem("isAuthenticated", "true");

    wrapper.find('.navbar-collapse__container').find('img').simulate('click');
    wrapper.find('.navbar-collapse__container').find('img').simulate('click');
    wrapper.find('.navbar-collapse__container').find('img').simulate('click');

    wrapper.find('.dropdown-main').find('p').at(1).simulate('click');

    expect(wrapper.find('NavBarCollapse').exists()).toEqual(true);
  });
});